import { NextRequest, NextResponse } from "next/server";
import { mockTemplates } from "@/utils/mock-templates";

// POST /api/templates/[id]/fork - Fork/Customize a template
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    console.log("POST /api/templates/[id]/fork - Forking template:", {
      id,
      customizations: Object.keys(body.customizations || {}),
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

    // TODO: Create user's customized version in database
    // TODO: Increment fork count

    template.forks += 1;

    const forkedTemplate = {
      ...template,
      id: `fork-${template.id}-${Date.now()}`,
      ...body.customizations,
      forkedFrom: template.id,
      createdAt: new Date(),
      isPublic: body.isPublic ?? false,
    };

    return NextResponse.json(
      {
        success: true,
        data: forkedTemplate,
        message: "Template forked successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/templates/[id]/fork error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fork template",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
