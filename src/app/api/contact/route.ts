import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ============================================================================
// CONTACT / INQUIRY API - /api/contact
// ----------------------------------------------------------------------------
// POST: Submit a contact / corporate inquiry with Name, Email, Phone, Company
// GET: List all inquiries
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, course, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and Email are required.' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone ? phone.trim() : null,
        company: company ? company.trim() : null,
        course: course ? course.trim() : null,
        message: message ? message.trim() : null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been received. Our team will contact you shortly.',
      contact,
    });
  } catch (error: unknown) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit inquiry',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      inquiries,
    });
  } catch (error: unknown) {
    console.error('Fetch contact inquiries error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch inquiries',
      },
      { status: 500 }
    );
  }
}
