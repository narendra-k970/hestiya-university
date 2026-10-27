import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ============================================================================
// UPDATE PROFILE API - POST /api/user/profile
// ----------------------------------------------------------------------------
// Allows logged-in users to update their personal details:
// - Full Name
// - Phone Number
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, phone, company } = body;

    if (!email || !name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Email and Name are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found.' },
        { status: 404 }
      );
    }

    // Update profile in PostgreSQL
    const updatedUser = await prisma.user.update({
      where: { email: cleanEmail },
      data: {
        name: name.trim(),
        phone: phone ? phone.trim() : null,
        company: company ? company.trim() : null,
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

    return NextResponse.json(
      {
        success: true,
        message: 'Profile updated successfully!',
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Update Profile Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error. Please try again later.',
      },
      { status: 500 }
    );
  }
}
