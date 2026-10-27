import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

// ============================================================================
// SIGNUP API - POST /api/auth/signup
// ----------------------------------------------------------------------------
// MERN developers ke liye comparison:
// 1. Express me: app.post('/api/auth/signup', async (req, res) => { ... })
//    Next.js me: export async function POST(request: Request) { ... }
// 2. Express me: const { email, password } = req.body;
//    Next.js me: const { email, password } = await request.json();
// 3. Mongoose me: User.findOne({ email })
//    Prisma me:  prisma.user.findUnique({ where: { email } })
// 4. Mongoose me: User.create({ ... })
//    Prisma me:  prisma.user.create({ data: { ... } })
// ============================================================================

export async function POST(request: Request) {
  try {
    // 1. Request Body Parse karna (Express ke req.body ki tarah)
    const body = await request.json();
    const { name, email, phone, password, role, company } = body;

    // 2. Input Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name, email, and password are required.' 
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please enter a valid email address.' 
        },
        { status: 400 }
      );
    }

    // Password length validation
    if (password.length < 6) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Password must be at least 6 characters long.' 
        },
        { status: 400 }
      );
    }

    // 3. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'This email is already registered. Please sign in.' 
        },
        { status: 409 } // 409 Conflict
      );
    }

    // 4. Password Hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 5. Create new User
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone ? phone.trim() : null,
        company: company ? company.trim() : null,
        password: hashedPassword,
        role: role === 'ADMIN' ? 'ADMIN' : 'LEARNER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        role: true,
        createdAt: true,
      },
    });

    // 6. Success Response
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully!',
        user: newUser,
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('Signup Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
