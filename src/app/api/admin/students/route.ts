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

    return NextResponse.json({
      success: true,
      students,
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

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      // Update company and phone if provided
      const updatedUser = await prisma.user.update({
        where: { email: cleanEmail },
        data: {
          name: name.trim(),
          phone: phone ? phone.trim() : existingUser.phone,
          company: company ? company.trim() : existingUser.company,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Student details updated successfully.',
        student: updatedUser,
      });
    }

    // Default secure password for enrolled student
    const defaultPassword = 'Student@' + Math.floor(1000 + Math.random() * 9000);
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const newStudent = await prisma.user.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        phone: phone ? phone.trim() : null,
        company: company ? company.trim() : null,
        password: hashedPassword,
        role: 'LEARNER',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Student enrolled successfully!',
      student: newStudent,
      tempPassword: defaultPassword,
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
