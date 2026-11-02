import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ============================================================================
// AUTOMATIC CERTIFICATE GENERATION API - POST /api/certificates/generate
// ----------------------------------------------------------------------------
// Takes learner name, email/userId, course title, and score (e.g. "100%"),
// generates a unique serial number (HEST-2026-XXXXX), saves it in the database,
// and returns the verified certificate with its public verification URL.
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      learnerName, 
      studentEmail, 
      userId, 
      courseTitle, 
      score = '80%' 
    } = body;

    // 1. Validation
    const cleanName = (learnerName || '').trim();
    if (!cleanName) {
      return NextResponse.json(
        { success: false, error: 'Student full name is required to issue a certificate.' },
        { status: 400 }
      );
    }

    const cleanCourse = (courseTitle || 'ESG Basics for Fashion & Manufacturing Supply Chains').trim();
    const cleanScore = (score || '80%').toString().trim();

    // 2. Resolve matching student user in DB if userId or email provided
    let matchedUser = null;
    if (userId) {
      matchedUser = await prisma.user.findUnique({
        where: { id: userId },
      });
    }

    if (!matchedUser && studentEmail) {
      matchedUser = await prisma.user.findUnique({
        where: { email: studentEmail.toLowerCase().trim() },
      });
    }

    // 3. Check for existing certificate for this learner & course
    const existingCert = await prisma.certificate.findFirst({
      where: {
        courseTitle: cleanCourse,
        OR: [
          ...(matchedUser ? [{ userId: matchedUser.id }] : []),
          { learnerName: { equals: cleanName, mode: 'insensitive' } },
        ],
      },
    });

    if (existingCert) {
      // Update score and re-link user if needed
      const updatedCert = await prisma.certificate.update({
        where: { id: existingCert.id },
        data: {
          score: cleanScore,
          issuedAt: new Date(),
          ...(matchedUser && !existingCert.userId ? { userId: matchedUser.id } : {}),
        },
      });

      return NextResponse.json({
        success: true,
        alreadyExisted: true,
        message: 'Your existing official certificate has been updated with your new passing score!',
        certificate: updatedCert,
        verificationUrl: `/verify/${updatedCert.serial}`,
      });
    }

    // 4. Generate unique serial number (e.g. HEST-2026-K89F2)
    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    const serial = `HEST-${new Date().getFullYear()}-${randomCode}`;
    const verificationSlug = `${serial.toLowerCase()}-${Date.now().toString().slice(-4)}`;

    // 5. Create new certificate in database
    const certificate = await prisma.certificate.create({
      data: {
        serial,
        learnerName: cleanName,
        courseTitle: cleanCourse,
        score: cleanScore,
        status: 'Valid',
        verificationSlug,
        userId: matchedUser ? matchedUser.id : null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      alreadyExisted: false,
      message: 'Official verified certificate generated successfully!',
      certificate,
      verificationUrl: `/verify/${certificate.serial}`,
    });
  } catch (error: unknown) {
    console.error('Automatic certificate generation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate certificate',
      },
      { status: 500 }
    );
  }
}
