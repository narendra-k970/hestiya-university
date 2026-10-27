import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

// ============================================================================
// CHANGE PASSWORD API - POST /api/auth/change-password
// ----------------------------------------------------------------------------
// For logged-in users inside Dashboard Settings:
// 1. User enters current password and new password
// 2. Verifies current password using bcrypt.compare
// 3. Hashes and updates new password
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, currentPassword, newPassword } = body;

    // Validation
    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Email, current password, and new password are all required.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { success: false, error: 'New password must be different from current password.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Find user in PostgreSQL
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found.' },
        { status: 404 }
      );
    }

    // Verify current password
    const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordCorrect) {
      return NextResponse.json(
        { success: false, error: 'Incorrect current password.' },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update in database
    await prisma.user.update({
      where: { email: cleanEmail },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Password updated successfully!',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Change Password Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error. Please try again later.',
      },
      { status: 500 }
    );
  }
}
