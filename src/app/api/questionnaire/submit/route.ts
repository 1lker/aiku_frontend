import { NextRequest, NextResponse } from "next/server";

// POST /api/questionnaire/submit - Submit questionnaire answers
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("POST /api/questionnaire/submit - Submitting answers:", {
      questionIndex: body.questionIndex,
      optionsCount: body.options?.length || 0,
      day: body.meta?.day,
      timeSlot: `${body.meta?.startTime}-${body.meta?.endTime}`,
    });

    // Log each selected option
    if (body.options && Array.isArray(body.options)) {
      body.options.forEach((option: any, index: number) => {
        console.log(`  Option ${index + 1}:`, {
          text: option.text?.substring(0, 50),
          tags: option.tags,
        });
      });
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    // TODO: Save to database
    // TODO: Generate personalized recommendations based on answers

    return NextResponse.json({
      success: true,
      data: {
        questionIndex: body.questionIndex,
        saved: true,
        timestamp: new Date().toISOString(),
      },
      message: "Answers submitted successfully",
    });
  } catch (error) {
    console.error("POST /api/questionnaire/submit error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit answers",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
