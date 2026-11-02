import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

// ============================================================================
// EXAM SUBMIT API - POST /api/exam/submit
// ----------------------------------------------------------------------------
// Grades student answers against the tamper-proof server answer key, calculates
// the exact percentage score (out of 100 questions), checks 80% passing cutoff,
// and automatically registers the official certificate on passing.
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      examSessionToken, 
      answers = {}, 
      courseSlug = 'esg-basics-supply-chains',
      learnerName,
      learnerEmail 
    } = body;

    if (!examSessionToken) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing exam session token.' },
        { status: 400 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET || 'hestiya_university_exam_secure_secret_key_2026';

    // Verify session token
    let sessionPayload: any;
    try {
      sessionPayload = jwt.verify(examSessionToken, jwtSecret);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Exam session expired or tampered. Please restart the exam.' },
        { status: 401 }
      );
    }

    const { serverAnswerKey, totalQuestions = 100 } = sessionPayload;

    // Grade answers
    let correctCount = 0;
    const questionIds = Object.keys(serverAnswerKey);

    questionIds.forEach((qIdStr) => {
      const qId = Number(qIdStr);
      const studentAnswer = answers[qId];
      const correctExpectedKey = serverAnswerKey[qId]?.correctKey;

      if (studentAnswer && correctExpectedKey && studentAnswer === correctExpectedKey) {
        correctCount += 1;
      }
    });

    const evaluatedTotal = questionIds.length || totalQuestions;
    const finalPercentage = Math.round((correctCount / evaluatedTotal) * 100);
    const passed = finalPercentage >= 80;

    let certificateRecord: any = null;

    // If passed: Auto-generate official certificate in database!
    if (passed) {
      const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
      const serial = `HEST-${new Date().getFullYear()}-${randomCode}`;
      const verificationSlug = serial.toLowerCase();

      const finalCourseTitle = courseSlug.includes('carbon')
        ? 'Carbon Markets & I-RECs Fundamentals'
        : 'ESG Basics for Fashion & Manufacturing Supply Chains';

      const finalName = (learnerName || 'Hestiya Certified Candidate').trim();

      // Check if student user exists in database to associate
      let userId: string | null = null;
      let enrolmentId: string | null = null;

      if (learnerEmail) {
        const user = await prisma.user.findUnique({
          where: { email: learnerEmail.toLowerCase().trim() },
          include: {
            enrolments: {
              where: {
                course: {
                  slug: courseSlug,
                },
              },
            },
          },
        });

        if (user) {
          userId = user.id;
          if (user.enrolments && user.enrolments.length > 0) {
            enrolmentId = user.enrolments[0].id;
            // Mark enrolment as completed
            await prisma.enrolment.update({
              where: { id: enrolmentId },
              data: {
                status: 'completed',
                completedAt: new Date(),
              },
            });
          }
        }
      }

      // Create Certificate record
      certificateRecord = await prisma.certificate.create({
        data: {
          serial,
          verificationSlug,
          learnerName: finalName,
          courseTitle: finalCourseTitle,
          score: `${finalPercentage}%`,
          status: 'Valid',
          userId: userId || undefined,
          enrolmentId: enrolmentId || undefined,
        },
      });
    }

    return NextResponse.json({
      success: true,
      score: finalPercentage,
      correctCount,
      totalQuestions: evaluatedTotal,
      passingPercentage: 80,
      passed,
      certificate: certificateRecord ? {
        id: certificateRecord.id,
        serial: certificateRecord.serial,
        verificationUrl: `/verify/${certificateRecord.serial}`,
        score: certificateRecord.score,
        issuedAt: certificateRecord.issuedAt,
        learnerName: certificateRecord.learnerName,
        courseTitle: certificateRecord.courseTitle,
      } : null,
      message: passed
        ? `Congratulations! You passed the comprehensive examination with ${finalPercentage}%. Your official certificate has been issued.`
        : `You scored ${finalPercentage}%. The passing standard is 80%. Review the course modules and retake the examination.`
    });

  } catch (error: unknown) {
    console.error('Error submitting exam:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit and grade exam',
      },
      { status: 500 }
    );
  }
}
