import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

// ============================================================================
// STUDENT CERTIFICATES API - GET /api/student/certificates
// ----------------------------------------------------------------------------
// Fetches certificates issued to the logged-in student.
// ============================================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let userId = searchParams.get('userId');
    let userEmail = searchParams.get('email');

    // 1. Try reading from cookie or Authorization header if params not passed
    if (!userId && !userEmail) {
      const cookieStore = await cookies();
      const token = cookieStore.get('token')?.value;

      if (token) {
        try {
          const jwtSecret = process.env.JWT_SECRET || 'hestiya_university_secret_fallback_key';
          const decoded = jwt.verify(token, jwtSecret) as { userId?: string; email?: string };
          userId = decoded.userId || null;
          userEmail = decoded.email || null;
        } catch {
          // Token expired or invalid
        }
      }
    }

    // 2. Also check Authorization header
    if (!userId && !userEmail) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
          const token = authHeader.substring(7);
          const jwtSecret = process.env.JWT_SECRET || 'hestiya_university_secret_fallback_key';
          const decoded = jwt.verify(token, jwtSecret) as { userId?: string; email?: string };
          userId = decoded.userId || null;
          userEmail = decoded.email || null;
        } catch {
          // Ignore
        }
      }
    }

    if (!userId && !userEmail) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required. Please sign in to view certificates.',
          certificates: [],
        },
        { status: 401 }
      );
    }

    // 3. Find user
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          ...(userId ? [{ id: userId }] : []),
          ...(userEmail ? [{ email: userEmail.toLowerCase().trim() }] : []),
        ],
      },
    });

    if (!user) {
      return NextResponse.json({
        success: true,
        certificates: [],
      });
    }

    // 4. Find all certificates belonging to this user
    const certificates = await prisma.certificate.findMany({
      where: {
        OR: [
          { userId: user.id },
          { learnerName: { equals: user.name, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        issuedAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      certificates,
    });
  } catch (error: unknown) {
    console.error('Student certificates error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch certificates',
        certificates: [],
      },
      { status: 500 }
    );
  }
}
