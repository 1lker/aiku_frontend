export interface TripActivity {
  id: string;
  day: number;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  category: "breakfast" | "lunch" | "dinner" | "culture" | "activity" | "evening" | "nightlife";
  imageId?: number;
  location?: string;
  cost?: "budget" | "moderate" | "premium";
  tags: string[];
}

export interface TripTemplate {
  id: string;
  title: string;
  description: string;
  destination: string;
  country: string;
  duration: number; // days
  coverImageId: number;

  // Creator info
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  createdAt: Date | string;

  // Trip details
  activities: TripActivity[];
  totalCost?: "budget" | "moderate" | "premium";
  travelStyle: string[]; // ["adventure", "culture", "food", "relaxation"]
  bestFor: string[]; // ["solo", "couple", "family", "friends"]

  // Social features
  likes: number;
  saves: number;
  forks: number; // How many people customized this
  rating: number; // 0-5
  reviews: number;

  // Metadata
  tags: string[];
  isPublic: boolean;
  isFeatured?: boolean;
}

export interface TemplateFilter {
  destination?: string;
  duration?: number;
  travelStyle?: string[];
  bestFor?: string[];
  cost?: string;
  sortBy?: "popular" | "recent" | "rating" | "duration";
}

export interface UserTemplate {
  templateId: string;
  customizations?: Partial<TripTemplate>;
  savedAt: Date | string;
  notes?: string;
}
