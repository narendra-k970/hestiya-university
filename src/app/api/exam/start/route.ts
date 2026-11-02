import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { generateStudentExamPaper } from '@/data/courses/question-bank';

// ============================================================================
// EXAM START API - POST /api/exam/start
// ----------------------------------------------------------------------------
// Samples 100 random questions from the 500-question pool, shuffles the serial
// sequence (1 to 100), randomizes option order (A, B, C, D), and returns the
// safe question paper to the client while signing the answer key in a secure JWT.
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { courseSlug = 'esg-basics-supply-chains', questionCount = 100 } = body;

    // Generate unique randomized exam paper for the specific course
    const { clientQuestions, serverAnswerKey } = generateStudentExamPaper(courseSlug, questionCount);

    const jwtSecret = process.env.JWT_SECRET || 'hestiya_university_exam_secure_secret_key_2026';

    // Sign the answer key in an encrypted/signed session token
    // The client NEVER sees this payload, only submits it back on /api/exam/submit
    const examSessionToken = jwt.sign(
      {
        courseSlug,
        totalQuestions: clientQuestions.length,
        serverAnswerKey,
        startedAt: Date.now(),
      },
      jwtSecret,
      { expiresIn: '3h' } // 3 hours window to finish 2-hour exam
    );

    return NextResponse.json({
      success: true,
      totalQuestions: clientQuestions.length,
      durationMinutes: 120, // 2 Hours
      passingPercentage: 80,
      questions: clientQuestions,
      examSessionToken,
    });

  } catch (error: unknown) {
    console.error('Error starting exam:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate exam session',
      },
      { status: 500 }
    );
  }
}
