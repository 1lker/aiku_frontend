import { NextRequest, NextResponse } from "next/server";
import { mockTemplates } from "@/utils/mock-templates";

// GET /api/templates?destination=Berlin&duration=3&sortBy=popular
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const destination = searchParams.get("destination");
    const duration = searchParams.get("duration");
    const sortBy = searchParams.get("sortBy") as "popular" | "recent" | "rating" | null;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filtered = [...mockTemplates];

    // Filter by destination
    if (destination) {
      filtered = filtered.filter((t) =>
        t.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }

    // Filter by duration
    if (duration) {
      const durationNum = parseInt(duration);
      filtered = filtered.filter((t) => t.duration === durationNum);
    }

    // Sort
    if (sortBy === "popular") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "recent") {
      filtered.sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Serialize dates to strings for JSON
    const serializedTemplates = filtered.map((t) => ({
      ...t,
      createdAt: t.createdAt instanceof Date ? t.createdAt.toISOString() : t.createdAt,
    }));

    return NextResponse.json({
      success: true,
      data: serializedTemplates,
      count: serializedTemplates.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("GET /api/templates error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch templates",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST /api/templates - Create new template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("POST /api/templates - Creating template:", {
      title: body.title,
      destination: body.destination,
      duration: body.duration,
    });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    // TODO: Validate body with Zod
    // TODO: Save to database

    const newTemplate = {
      id: `template-${Date.now()}`,
      ...body,
      createdAt: new Date(),
      likes: 0,
      saves: 0,
      forks: 0,
      rating: 0,
      reviews: 0,
      isPublic: true,
    };

    return NextResponse.json(
      {
        success: true,
        data: newTemplate,
        message: "Template created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/templates error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create template",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
