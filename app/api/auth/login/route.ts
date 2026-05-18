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
    const { email, password } = await req.json();
    const normalizedEmail = String(email || '').toLowerCase().trim();

    // 1. Missing fields check
    if (!normalizedEmail || !password) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email and password are required' 
      }, { status: 400 });
    }

    let authenticatedEmail: string | null = null;
    let authenticatedId: string | null = null;

    // 2. Try DB admin first, but don't fail hard if DB is unavailable.
    try {
      await dbConnect();
      const admin = await Admin.findOne({ email: normalizedEmail }).select('+password');

      if (admin) {
        const isMatch = await admin.matchPassword(password);
        if (isMatch) {
          authenticatedEmail = admin.email;
          authenticatedId = String(admin._id);
        }
      }
    } catch (dbError) {
      console.error('Login DB lookup failed, attempting env fallback:', dbError);
    }

    if (!authenticatedEmail && !authenticatedId && (
      ADMIN_EMAIL &&
      ADMIN_PASSWORD &&
      normalizedEmail === ADMIN_EMAIL.toLowerCase().trim() &&
      password === ADMIN_PASSWORD
    )) {
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
