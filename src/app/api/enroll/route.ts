import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

// ============================================================================
// STUDENT COURSE ENROLLMENT API - POST /api/enroll
// ----------------------------------------------------------------------------
// Registers or updates student details, creates enrollment in the selected course,
// establishes secure JWT session, and syncs with the Admin dashboard.
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      company,
      jobTitle,
      industry,
      country,
      courseSlug = 'esg-basics-supply-chains',
      courseTitle = 'ESG Basics for Fashion & Manufacturing Supply Chains',
      password,
      learningGoal,
    } = body;

    // 1. Mandatory Input Validation
    const cleanName = (fullName || '').trim();
    const cleanEmail = (email || '').toLowerCase().trim();
    const cleanPhone = (phone || '').trim();
    const cleanCompany = (company || '').trim();

    if (!cleanName || !cleanEmail) {
      return NextResponse.json(
        { success: false, error: 'Full name and email are required to enroll.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 2. Resolve Course Title from slug if needed
    const finalCourseSlug = courseSlug.includes('carbon')
      ? 'carbon-markets-irec-fundamentals'
      : 'esg-basics-supply-chains';

    const finalCourseTitle = courseSlug.includes('carbon')
      ? 'Carbon Markets & I-RECs Fundamentals'
      : 'ESG Basics for Fashion & Manufacturing Supply Chains';

    // 3. Check for existing User
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    const jwtSecret = process.env.JWT_SECRET || 'hestiya_university_secret_fallback_key';

    if (user) {
      // Update student profile with latest phone, company
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: cleanName || user.name,
          phone: cleanPhone || user.phone,
          company: cleanCompany || user.company,
        },
      });
    } else {
      // Create new student user
      const rawPassword = password && password.length >= 6 ? password : 'Student@2026';
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      user = await prisma.user.create({
        data: {
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone || null,
          company: cleanCompany || null,
          password: hashedPassword,
          role: 'LEARNER',
        },
      });
    }

    // 4. Resolve or create Course in database
    let course = await prisma.course.findFirst({
      where: {
        OR: [
          { slug: finalCourseSlug },
          { title: { equals: finalCourseTitle, mode: 'insensitive' } },
        ],
      },
    });

    if (!course) {
      course = await prisma.course.create({
        data: {
          slug: finalCourseSlug,
          title: finalCourseTitle,
          hook: 'Professional forensic supply chain and sustainability audit track.',
          description: 'Comprehensive curriculum designed for auditors, sustainability leaders, and supply chain managers.',
          audience: 'Supply chain directors, sustainability controllers, procurement executives',
          duration: '4.5 – 6 Hours',
          ilos: JSON.stringify(['Master forensic auditing', 'Understand regulatory frameworks', 'Avoid greenwashing']),
          status: 'published',
        },
      });
    }

    // 5. Create Enrolment if not already present
    let enrolment = await prisma.enrolment.findFirst({
      where: {
        userId: user.id,
        courseId: course.id,
      },
    });

    if (!enrolment) {
      enrolment = await prisma.enrolment.create({
        data: {
          userId: user.id,
          courseId: course.id,
          status: 'in_progress',
        },
      });
    }

    // 6. Record in Contact table for audit trail & inquiry tracking
    try {
      await prisma.contact.create({
        data: {
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone || null,
          company: cleanCompany || null,
          course: finalCourseTitle,
          message: `Enrolled via Admissions Form. Role: ${jobTitle || 'N/A'} | Industry: ${industry || 'N/A'} | Country: ${country || 'N/A'} | Goal: ${learningGoal || 'Professional Certification'}`,
        },
      });
    } catch (contactErr) {
      console.warn('Contact logging non-critical notice:', contactErr);
    }

    // 7. Generate JWT Session Token
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

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.company,
      role: user.role,
    };

    const response = NextResponse.json({
      success: true,
      message: `Congratulations! You have successfully enrolled in ${finalCourseTitle}.`,
      user: userPayload,
      course: {
        slug: finalCourseSlug,
        title: finalCourseTitle,
      },
      enrolmentId: enrolment.id,
    });

    // Set cookie for session persistence
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
    console.error('Enrollment API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during enrollment.',
      },
      { status: 500 }
    );
  }
}
