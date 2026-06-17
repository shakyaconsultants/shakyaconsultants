import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';
import { ensureAdminFromEnv, matchesEnvAdminCredentials } from '@/lib/ensureAdmin';

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = '7d';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const normalizedEmail = String(email || '').toLowerCase().trim();
    const normalizedPassword = String(password || '');

    if (!normalizedEmail || !normalizedPassword) {
      return NextResponse.json({
        success: false,
        error: 'Email and password are required',
      }, { status: 400 });
    }

    let authenticatedEmail: string | null = null;
    let authenticatedId: string | null = null;

    // 1. Authenticate against MongoDB admin record.
    try {
      await dbConnect();
      const admin = await Admin.findOne({ email: normalizedEmail }).select('+password');

      if (admin) {
        const isMatch = await admin.matchPassword(normalizedPassword);
        if (isMatch) {
          authenticatedEmail = admin.email;
          authenticatedId = String(admin._id);
        }
      }
    } catch (dbError) {
      console.error('Login DB lookup failed:', dbError);
    }

    // 2. Env fallback — also syncs credentials into MongoDB when they match.
    if (!authenticatedEmail && matchesEnvAdminCredentials(normalizedEmail, normalizedPassword)) {
      try {
        const admin = await ensureAdminFromEnv();
        authenticatedEmail = admin.email;
        authenticatedId = String(admin._id);
      } catch (syncError) {
        console.error('Env admin sync failed:', syncError);
        return NextResponse.json({
          success: false,
          error: 'Invalid credentials',
        }, { status: 401 });
      }
    }

    if (!authenticatedEmail || !authenticatedId) {
      return NextResponse.json({
        success: false,
        error: 'Invalid credentials',
      }, { status: 401 });
    }

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is missing in environment variables');
    }

    const token = jwt.sign(
      { id: authenticatedId, email: authenticatedEmail },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    return NextResponse.json({
      success: true,
      token,
      message: 'Logged in successfully',
    }, { status: 200 });
  } catch (error: unknown) {
    console.error('Login API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Server error during login',
    }, { status: 500 });
  }
}
