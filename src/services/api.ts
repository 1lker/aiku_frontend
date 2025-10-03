import type { TripTemplate } from "@/types/template";
import type { Question, Option } from "@/utils/questionnaire";

// Base API URL
const API_BASE = "/api";

// Generic API error handler
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.error || data.message || "API request failed", response.status, data);
  }

  return data;
}

// ==================== TEMPLATES API ====================

export const templatesApi = {
  /**
   * GET /api/templates
   * Fetch all templates with optional filters
   */
  async getAll(params?: {
    destination?: string;
    duration?: number;
    sortBy?: "popular" | "recent" | "rating";
  }): Promise<{ success: boolean; data: TripTemplate[]; count: number }> {
    const searchParams = new URLSearchParams();
    if (params?.destination) searchParams.set("destination", params.destination);
    if (params?.duration) searchParams.set("duration", params.duration.toString());
    if (params?.sortBy) searchParams.set("sortBy", params.sortBy);

    const url = `${API_BASE}/templates${searchParams.toString() ? `?${searchParams}` : ""}`;
    console.log("📡 API Call: GET", url);

    const response = await fetch(url);
    return handleResponse(response);
  },

  /**
   * GET /api/templates/[id]
   * Fetch single template by ID
   */
  async getById(id: string): Promise<{ success: boolean; data: TripTemplate }> {
    const url = `${API_BASE}/templates/${id}`;
    console.log("📡 API Call: GET", url);

    const response = await fetch(url);
    return handleResponse(response);
  },

  /**
   * POST /api/templates
   * Create new template
   */
  async create(template: Partial<TripTemplate>): Promise<{ success: boolean; data: TripTemplate }> {
    const url = `${API_BASE}/templates`;
    console.log("📡 API Call: POST", url, template);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(template),
    });
    return handleResponse(response);
  },

  /**
   * PATCH /api/templates/[id]
   * Update template
   */
  async update(
    id: string,
    updates: Partial<TripTemplate>
  ): Promise<{ success: boolean; data: TripTemplate }> {
    const url = `${API_BASE}/templates/${id}`;
    console.log("📡 API Call: PATCH", url, updates);

    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },

  /**
   * DELETE /api/templates/[id]
   * Delete template
   */
  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const url = `${API_BASE}/templates/${id}`;
    console.log("📡 API Call: DELETE", url);

    const response = await fetch(url, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  /**
   * POST /api/templates/[id]/like
   * Like a template
   */
  async like(id: string): Promise<{ success: boolean; data: { likes: number; isLiked: boolean } }> {
    const url = `${API_BASE}/templates/${id}/like`;
    console.log("📡 API Call: POST", url);

    const response = await fetch(url, {
      method: "POST",
    });
    return handleResponse(response);
  },

  /**
   * DELETE /api/templates/[id]/like
   * Unlike a template
   */
  async unlike(
    id: string
  ): Promise<{ success: boolean; data: { likes: number; isLiked: boolean } }> {
    const url = `${API_BASE}/templates/${id}/like`;
    console.log("📡 API Call: DELETE", url);

    const response = await fetch(url, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  /**
   * POST /api/templates/[id]/fork
   * Fork/customize a template
   */
  async fork(
    id: string,
    customizations?: Partial<TripTemplate>
  ): Promise<{ success: boolean; data: TripTemplate }> {
    const url = `${API_BASE}/templates/${id}/fork`;
    console.log("📡 API Call: POST", url, customizations);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customizations }),
    });
    return handleResponse(response);
  },
};

// ==================== QUESTIONNAIRE API ====================

export const questionnaireApi = {
  /**
   * GET /api/questionnaire
   * Fetch questionnaire for specified days
   */
  async get(days: number = 3): Promise<{ success: boolean; data: Question[]; count: number }> {
    const url = `${API_BASE}/questionnaire?days=${days}`;
    console.log("📡 API Call: GET", url);

    const response = await fetch(url);
    return handleResponse(response);
  },

  /**
   * POST /api/questionnaire/submit
   * Submit questionnaire answers
   */
  async submit(data: {
    questionIndex: number;
    options: Option[];
    meta: {
      day: number;
      startTime: string;
      endTime: string;
    };
  }): Promise<{ success: boolean; message: string }> {
    const url = `${API_BASE}/questionnaire/submit`;
    console.log("📡 API Call: POST", url, data);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

// Export error class for error handling
export { ApiError };
