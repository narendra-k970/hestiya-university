import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

// ============================================================================
// ADMIN STUDENTS API - /api/admin/students
// ----------------------------------------------------------------------------
// GET: List all registered learners with company & certificates
// POST: Enrol a new student with Name, Email, Phone, Company, Course
// ============================================================================

export async function GET() {
  try {
    const students = await prisma.user.findMany({
      where: {
        AND: [
          { role: { not: 'ADMIN' } },
          { role: { not: 'admin' } },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        role: true,
        createdAt: true,
        enrolments: {
          select: {
            id: true,
            status: true,
            startedAt: true,
            course: {
              select: {
                id: true,
                slug: true,
                title: true,
              },
            },
          },
        },
        certificates: {
          select: {
            id: true,
            serial: true,
            courseTitle: true,
            score: true,
            status: true,
            fileUrl: true,
            issuedAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format students with convenient direct course title and slug
    const formattedStudents = students.map((s) => {
      const primaryEnrolment = s.enrolments && s.enrolments.length > 0 ? s.enrolments[0] : null;
      return {
        ...s,
        course: primaryEnrolment?.course?.title || 'ESG Basics for Fashion & Manufacturing Supply Chains',
        courseSlug: primaryEnrolment?.course?.slug || 'esg-basics-supply-chains',
        enrolmentStatus: primaryEnrolment?.status || 'in_progress',
      };
    });

    return NextResponse.json({
      success: true,
      students: formattedStudents,
    });
  } catch (error: unknown) {
    console.error('Fetch students error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch students',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, course } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Student Name and Email are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name.trim();

    // Resolve course
    const selectedCourseTitle = (course || '').toLowerCase().includes('carbon')
      ? 'Carbon Markets & I-RECs Fundamentals'
      : 'ESG Basics for Fashion & Manufacturing Supply Chains';

    const selectedCourseSlug = (course || '').toLowerCase().includes('carbon')
      ? 'carbon-markets-irec-fundamentals'
      : 'esg-basics-supply-chains';

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (user) {
      // Update company and phone if provided
      user = await prisma.user.update({
        where: { email: cleanEmail },
        data: {
          name: cleanName,
          phone: phone ? phone.trim() : user.phone,
          company: company ? company.trim() : user.company,
        },
      });
    } else {
      // Default secure password for enrolled student
      const defaultPassword = 'Student@' + Math.floor(1000 + Math.random() * 9000);
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      user = await prisma.user.create({
        data: {
          name: cleanName,
          email: cleanEmail,
          phone: phone ? phone.trim() : null,
          company: company ? company.trim() : null,
          password: hashedPassword,
          role: 'LEARNER',
        },
      });
    }

    // Resolve or create Course
    let courseRecord = await prisma.course.findFirst({
      where: {
        OR: [
          { slug: selectedCourseSlug },
          { title: { equals: selectedCourseTitle, mode: 'insensitive' } },
        ],
      },
    });

    if (!courseRecord) {
      courseRecord = await prisma.course.create({
        data: {
          slug: selectedCourseSlug,
          title: selectedCourseTitle,
          hook: 'Professional forensic supply chain and sustainability audit track.',
          description: 'Comprehensive curriculum designed for auditors, sustainability leaders, and supply chain managers.',
          audience: 'Supply chain directors, sustainability controllers, procurement executives',
          duration: selectedCourseSlug.includes('carbon') ? '5 – 6.5 Hours' : '4.5 – 6 Hours',
          ilos: JSON.stringify(['Master forensic auditing', 'Understand regulatory frameworks', 'Avoid greenwashing']),
          status: 'published',
        },
      });
    }

    // Ensure Enrolment exists
    let enrolment = await prisma.enrolment.findFirst({
      where: {
        userId: user.id,
        courseId: courseRecord.id,
      },
    });

    if (!enrolment) {
      enrolment = await prisma.enrolment.create({
        data: {
          userId: user.id,
          courseId: courseRecord.id,
          status: 'in_progress',
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Student enrolled successfully!',
      student: {
        ...user,
        course: courseRecord.title,
        courseSlug: courseRecord.slug,
      },
    });
  } catch (error: unknown) {
    console.error('Enrol student error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to enrol student',
      },
      { status: 500 }
    );
  }
}
