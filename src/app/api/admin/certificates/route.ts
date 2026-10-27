import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// ============================================================================
// ADMIN CERTIFICATES API - /api/admin/certificates
// ----------------------------------------------------------------------------
// GET: List all issued/uploaded certificates
// POST: Upload & issue a certificate for a specific student
// DELETE: Revoke/delete a certificate
// ============================================================================

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            company: true,
          },
        },
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
    console.error('Fetch certificates error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch certificates',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    let studentId = '';
    let studentEmail = '';
    let learnerName = '';
    let courseTitle = '';
    let score = '90%';
    let serial = '';
    let fileUrl: string | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      studentId = (formData.get('studentId') as string) || '';
      studentEmail = (formData.get('studentEmail') as string) || '';
      learnerName = (formData.get('learnerName') as string) || '';
      courseTitle = (formData.get('courseTitle') as string) || '';
      score = (formData.get('score') as string) || '90%';
      serial = (formData.get('serial') as string) || '';

      const file = formData.get('file') as File | null;
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize file name and create directory
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'certificates');
        await mkdir(uploadDir, { recursive: true });

        const ext = path.extname(file.name) || '.pdf';
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `cert_${Date.now()}_${safeName}`;
        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);
        fileUrl = `/uploads/certificates/${filename}`;
      }
    } else {
      const body = await request.json();
      studentId = body.studentId || '';
      studentEmail = body.studentEmail || '';
      learnerName = body.learnerName || '';
      courseTitle = body.courseTitle || '';
      score = body.score || '90%';
      serial = body.serial || '';
      fileUrl = body.fileUrl || null;
    }

    // Resolve student user if studentId or studentEmail provided
    let matchedUser = null;
    if (studentId) {
      matchedUser = await prisma.user.findUnique({
        where: { id: studentId },
      });
    } else if (studentEmail) {
      matchedUser = await prisma.user.findUnique({
        where: { email: studentEmail.toLowerCase().trim() },
      });
    }

    if (matchedUser) {
      learnerName = matchedUser.name;
    }

    if (!learnerName) {
      return NextResponse.json(
        { success: false, error: 'Student name or student selection is required.' },
        { status: 400 }
      );
    }

    if (!courseTitle) {
      courseTitle = 'ESG Basics for Fashion & Manufacturing Supply Chains';
    }

    // Auto-generate serial if empty (e.g. HEST-2026-X89K2)
    if (!serial || !serial.trim()) {
      const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
      serial = `HEST-${new Date().getFullYear()}-${randomCode}`;
    } else {
      serial = serial.trim().toUpperCase();
    }

    // Unique verification slug
    const verificationSlug = `${serial.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;

    // Create certificate in database
    const certificate = await prisma.certificate.create({
      data: {
        userId: matchedUser ? matchedUser.id : null,
        serial,
        learnerName,
        courseTitle,
        score,
        fileUrl,
        status: 'Valid',
        verificationSlug,
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
      message: 'Certificate issued and uploaded successfully!',
      certificate,
    });
  } catch (error: unknown) {
    console.error('Upload certificate error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload certificate',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Certificate ID is required.' },
        { status: 400 }
      );
    }

    await prisma.certificate.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Certificate deleted successfully.',
    });
  } catch (error: unknown) {
    console.error('Delete certificate error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete certificate',
      },
      { status: 500 }
    );
  }
}
