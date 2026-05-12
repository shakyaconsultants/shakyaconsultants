import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const TOKEN_EXPIRY = '7d';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    const normalizedEmail = String(email || '').toLowerCase().trim();

    // 1. Missing fields check
    if (!normalizedEmail || !password) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email and password are required' 
      }, { status: 400 });
    }

    // 2. Try DB admin first (must use .select('+password') since it's hidden by default)
    const admin = await Admin.findOne({ email: normalizedEmail }).select('+password');

    let authenticatedEmail: string | null = null;
    let authenticatedId: string | null = null;

    if (admin) {
      const isMatch = await admin.matchPassword(password);
      if (isMatch) {
        authenticatedEmail = admin.email;
        authenticatedId = String(admin._id);
      }
    } else if (
      ADMIN_EMAIL &&
      ADMIN_PASSWORD &&
      normalizedEmail === ADMIN_EMAIL.toLowerCase().trim() &&
      password === ADMIN_PASSWORD
    ) {
      // Fallback for projects where admin seed has not been run yet.
      authenticatedEmail = ADMIN_EMAIL.toLowerCase().trim();
      authenticatedId = `env-admin-${authenticatedEmail}`;
    }

    if (!authenticatedEmail || !authenticatedId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid credentials' 
      }, { status: 401 });
    }

    // 4. Generate JWT
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is missing in environment variables');
    }

    const token = jwt.sign(
      { id: authenticatedId, email: authenticatedEmail },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    // 5. Return success and token
    return NextResponse.json({ 
      success: true, 
      token,
      message: 'Logged in successfully'
    }, { status: 200 });

  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error during login' 
    }, { status: 500 });
  }
}
