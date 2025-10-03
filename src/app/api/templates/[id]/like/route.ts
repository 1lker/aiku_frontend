import { NextRequest, NextResponse } from "next/server";
import { mockTemplates } from "@/utils/mock-templates";

// POST /api/templates/[id]/like - Like a template
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    console.log("POST /api/templates/[id]/like - Liking template:", id);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const template = mockTemplates.find((t) => t.id === id);

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          error: "Template not found",
        },
        { status: 404 }
      );
    }

    // TODO: Check if user already liked (requires auth)
    // TODO: Update database

    template.likes += 1;

    return NextResponse.json({
      success: true,
      data: {
        id,
        likes: template.likes,
        isLiked: true,
      },
      message: "Template liked successfully",
    });
  } catch (error) {
    console.error("POST /api/templates/[id]/like error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to like template",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/templates/[id]/like - Unlike a template
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("DELETE /api/templates/[id]/like - Unliking template:", id);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const template = mockTemplates.find((t) => t.id === id);

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          error: "Template not found",
        },
        { status: 404 }
      );
    }

    // TODO: Update database

    template.likes = Math.max(0, template.likes - 1);

    return NextResponse.json({
      success: true,
      data: {
        id,
        likes: template.likes,
        isLiked: false,
      },
      message: "Template unliked successfully",
    });
  } catch (error) {
    console.error("DELETE /api/templates/[id]/like error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to unlike template",
      },
      { status: 500 }
    );
  }
}
