import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

// ============================================================================
// SIGNUP & COURSE ENROLLMENT API - POST /api/auth/signup
// ----------------------------------------------------------------------------
// Registers student with full details (Name, Email, Phone, Company, Password),
// automatically enrols them in the selected course track, establishes a secure
// 7-day JWT session cookie, and records the student in the database so admin
// sees them in /admin/students and they can log in anytime via /login.
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      company, 
      password, 
      role = 'LEARNER',
      course,
      courseSlug 
    } = body;

    // 1. Mandatory Input Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Full name, email address, and password are required.' 
        },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.toLowerCase().trim();
    const cleanPhone = phone ? phone.trim() : null;
    const cleanCompany = company ? company.trim() : null;

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
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

    // 2. Resolve Chosen Course Track
    const rawCourseParam = (courseSlug || course || '').toLowerCase();
    const finalCourseSlug = rawCourseParam.includes('carbon')
      ? 'carbon-markets-irec-fundamentals'
      : 'esg-basics-supply-chains';

    const finalCourseTitle = finalCourseSlug === 'carbon-markets-irec-fundamentals'
      ? 'Carbon Markets & I-RECs Fundamentals'
      : 'ESG Basics for Fashion & Manufacturing Supply Chains';

    // 3. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: cleanEmail,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'An account with this email already exists. Please sign in with your email and password.' 
        },
        { status: 409 }
      );
    }

    // 4. Password Hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 5. Create new Student User
    const newUser = await prisma.user.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        company: cleanCompany,
        password: hashedPassword,
        role: role === 'ADMIN' ? 'ADMIN' : 'LEARNER',
      },
    });

    // 6. Find or Create Course in DB
    let courseRecord = await prisma.course.findFirst({
      where: {
        OR: [
          { slug: finalCourseSlug },
          { title: { equals: finalCourseTitle, mode: 'insensitive' } },
        ],
      },
    });

    if (!courseRecord) {
      courseRecord = await prisma.course.create({
        data: {
          slug: finalCourseSlug,
          title: finalCourseTitle,
          hook: 'Professional forensic supply chain and sustainability audit track.',
          description: 'Comprehensive curriculum designed for auditors, sustainability leaders, and supply chain managers.',
          audience: 'Supply chain directors, sustainability controllers, procurement executives',
          duration: finalCourseSlug.includes('carbon') ? '5 – 6.5 Hours' : '4.5 – 6 Hours',
          ilos: JSON.stringify(['Master forensic auditing', 'Understand regulatory frameworks', 'Avoid greenwashing']),
          status: 'published',
        },
      });
    }

    // 7. Create Enrolment record for student
    let enrolment = await prisma.enrolment.findFirst({
      where: {
        userId: newUser.id,
        courseId: courseRecord.id,
      },
    });

    if (!enrolment) {
      enrolment = await prisma.enrolment.create({
        data: {
          userId: newUser.id,
          courseId: courseRecord.id,
          status: 'in_progress',
        },
      });
    }

    // 8. Log into Contact table for student tracking & inquiries
    try {
      await prisma.contact.create({
        data: {
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          company: cleanCompany,
          course: finalCourseTitle,
          message: `Self-registered student for: ${finalCourseTitle}`,
        },
      });
    } catch (contactErr) {
      console.warn('Contact logging non-critical notice:', contactErr);
    }

    // 9. Generate JWT Session Token (7 Days valid)
    const jwtSecret = process.env.JWT_SECRET || 'hestiya_university_secret_fallback_key';
    const token = jwt.sign(
      {
        userId: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    const safeUserPayload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      company: newUser.company,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };

    // 10. Return Response and Set HTTP-only Cookie
    const response = NextResponse.json(
      {
        success: true,
        message: 'Account created successfully! You are now enrolled and can log in anytime with your email & password.',
        user: safeUserPayload,
        course: {
          slug: courseRecord.slug,
          title: courseRecord.title,
        },
        enrolmentId: enrolment.id,
      },
      { status: 201 }
    );

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;

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
