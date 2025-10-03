import { NextRequest, NextResponse } from "next/server";
import { fetchMockQuestionnaire } from "@/utils/questionnaire";

// GET /api/questionnaire?days=3
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get("days") || "3");

    console.log("GET /api/questionnaire - Fetching questions for", days, "days");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const questions = await fetchMockQuestionnaire(days);

    return NextResponse.json({
      success: true,
      data: questions,
      count: questions.length,
      days,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("GET /api/questionnaire error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch questionnaire",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
