import { NextRequest, NextResponse } from "next/server";
import { mockTemplates } from "@/utils/mock-templates";

// GET /api/templates/[id]
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    console.log("GET /api/templates/[id] - Fetching template:", id);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const template = mockTemplates.find((t) => t.id === id);

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          error: "Template not found",
          message: `No template found with ID: ${id}`,
        },
        { status: 404 }
      );
    }

    // Serialize dates to strings for JSON
    const serializedTemplate = {
      ...template,
      createdAt:
        template.createdAt instanceof Date ? template.createdAt.toISOString() : template.createdAt,
    };

    return NextResponse.json({
      success: true,
      data: serializedTemplate,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("GET /api/templates/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch template",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PATCH /api/templates/[id] - Update template
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    console.log("PATCH /api/templates/[id] - Updating template:", {
      id,
      updates: Object.keys(body),
    });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400));

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

    // TODO: Validate body with Zod
    // TODO: Update in database

    const updatedTemplate = {
      ...template,
      ...body,
    };

    return NextResponse.json({
      success: true,
      data: updatedTemplate,
      message: "Template updated successfully",
    });
  } catch (error) {
    console.error("PATCH /api/templates/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update template",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/templates/[id] - Delete template
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("DELETE /api/templates/[id] - Deleting template:", id);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400));

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

    // TODO: Delete from database

    return NextResponse.json({
      success: true,
      message: "Template deleted successfully",
      data: { id },
    });
  } catch (error) {
    console.error("DELETE /api/templates/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete template",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
