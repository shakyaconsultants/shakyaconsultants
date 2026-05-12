import mongoose from 'mongoose';
import dns from 'node:dns';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let dnsConfigured = false;

function configureMongoDns() {
  if (dnsConfigured || !MONGODB_URI.startsWith('mongodb+srv://')) {
    return;
  }

  const envServers = (process.env.MONGODB_DNS_SERVERS || '')
    .split(',')
    .map((server) => server.trim())
    .filter(Boolean);

  const fallbackServers = ['1.1.1.1', '8.8.8.8'];
  const dnsServers = envServers.length > 0 ? envServers : fallbackServers;

  try {
    dns.setServers(dnsServers);
    dnsConfigured = true;
  } catch (error) {
    console.warn('Failed to set custom DNS servers for MongoDB SRV lookup:', error);
  }
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (global as any).mongooseCache;

if (!cached) {
  cached = (global as any).mongooseCache = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout for better error reporting
    };

    configureMongoDns();
    console.log('Connecting to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongooseInstance) => {
      console.log('MongoDB Connected successfully');
      return mongooseInstance;
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise so we can retry on next request
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
