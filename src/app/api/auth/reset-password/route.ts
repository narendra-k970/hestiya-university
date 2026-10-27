import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

// ============================================================================
// RESET PASSWORD API - POST /api/auth/reset-password
// ----------------------------------------------------------------------------
// Flow:
// 1. User email aur naya password bhejta hai
// 2. Database me check hota hai ki user exist karta hai ya nahi
// 3. Naye password ko bcrypt se hash karke update karte hain
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, newPassword } = body;

    // Validation
    if (!email || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Email and new password are both required.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check user in PostgreSQL
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'No account found with this email address.' },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in PostgreSQL
    await prisma.user.update({
      where: { email: cleanEmail },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Password reset successfully! You can now sign in.',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Reset Password Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error. Please try again later.',
      },
      { status: 500 }
    );
  }
}
