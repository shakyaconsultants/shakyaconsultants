import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';

function getEnvAdminCredentials() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!email || !password) {
    return null;
  }

  return { email, password };
}

/**
 * Upserts the admin account from ADMIN_EMAIL / ADMIN_PASSWORD env vars.
 * Password is stored via the Admin model pre-save hook (bcrypt).
 */
export async function ensureAdminFromEnv() {
  const credentials = getEnvAdminCredentials();
  if (!credentials) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables');
  }

  await dbConnect();

  const existing = await Admin.findOne({ email: credentials.email }).select('+password');

  if (existing) {
    existing.password = credentials.password;
    await existing.save();
    return existing;
  }

  return Admin.create({
    email: credentials.email,
    password: credentials.password,
  });
}

export function matchesEnvAdminCredentials(email: string, password: string) {
  const credentials = getEnvAdminCredentials();
  if (!credentials) {
    return false;
  }

  const normalizedEmail = email.toLowerCase().trim();
  return normalizedEmail === credentials.email && password === credentials.password;
}
