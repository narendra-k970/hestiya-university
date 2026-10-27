import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

// ============================================================================
// LOGIN API - POST /api/auth/login
// ----------------------------------------------------------------------------
// MERN developer comparison:
// 1. Express me: app.post('/api/auth/login', async (req, res) => { ... })
//    Next.js me: export async function POST(request: Request) { ... }
// 2. Mongoose: User.findOne({ email })
//    Prisma:   prisma.user.findUnique({ where: { email } })
// 3. Password: bcrypt.compare(password, user.password)
// 4. Token:    jwt.sign({ userId: user.id, role: user.role }, SECRET, { expiresIn: '7d' })
// 5. Cookies:  NextResponse cookies.set(...) (Automatic secure session)
// ============================================================================

export async function POST(request: Request) {
  try {
    // 1. Request Body Parse karna
    const body = await request.json();
    const { email, password } = body;

    // 2. Input Validation
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email and password are both required.' 
        },
        { status: 400 }
      );
    }

    // 3. Find user in database
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email or password.' 
        },
        { status: 401 } // 401 Unauthorized
      );
    }

    // 4. Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email or password.' 
        },
        { status: 401 }
      );
    }

    // 5. JWT Token generate karna (7 Days ke liye)
    const jwtSecret = process.env.JWT_SECRET || 'hestiya_university_secret_fallback_key';
    const token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // 6. Safe User Object (Password ko response me nahi bhejte)
    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.company,
      role: user.role,
      createdAt: user.createdAt,
    };

    // 7. Success Response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful!',
        user: userPayload,
        token,
      },
      { status: 200 }
    );

    // Secure HTTP-only Cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    });

    return response;

  } catch (error: unknown) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
