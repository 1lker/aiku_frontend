import { TripTemplate } from "@/types/template";

export const mockTemplates: TripTemplate[] = [
  {
    id: "berlin-culture-3d",
    title: "Berlin Culture & History Deep Dive",
    description:
      "Perfect 3-day itinerary exploring Berlin's rich history, world-class museums, and vibrant art scene. Includes iconic landmarks and hidden gems.",
    destination: "Berlin",
    country: "Germany",
    duration: 3,
    coverImageId: 26, // Brandenburg Gate
    createdBy: {
      id: "user1",
      name: "Sarah Chen",
      avatar: "https://picsum.photos/id/64/100/100",
      isVerified: true,
    },
    createdAt: new Date("2024-09-15T10:00:00Z"),
    activities: [],
    totalCost: "moderate",
    travelStyle: ["culture", "history", "art", "walking"],
    bestFor: ["solo", "couple", "friends"],
    likes: 1247,
    saves: 892,
    forks: 234,
    rating: 4.8,
    reviews: 156,
    tags: ["museums", "history", "art", "architecture", "walking-tours"],
    isPublic: true,
    isFeatured: true,
  },
  {
    id: "berlin-food-weekend",
    title: "Berlin Food Lover's Weekend",
    description:
      "A culinary journey through Berlin's diverse food scene. From street food to Michelin stars, experience the best flavors Berlin has to offer.",
    destination: "Berlin",
    country: "Germany",
    duration: 2,
    coverImageId: 365, // Food
    createdBy: {
      id: "user2",
      name: "Marco Rossi",
      avatar: "https://picsum.photos/id/91/100/100",
      isVerified: true,
    },
    createdAt: new Date("2024-10-01T10:00:00Z"),
    activities: [],
    totalCost: "moderate",
    travelStyle: ["food", "culture", "nightlife"],
    bestFor: ["couple", "friends"],
    likes: 982,
    saves: 674,
    forks: 189,
    rating: 4.9,
    reviews: 98,
    tags: ["food", "restaurants", "markets", "local-cuisine", "street-food"],
    isPublic: true,
    isFeatured: true,
  },
  {
    id: "paris-romance-5d",
    title: "Romantic Paris in 5 Days",
    description:
      "The ultimate romantic getaway featuring iconic landmarks, cozy cafés, Seine river cruises, and intimate dining experiences.",
    destination: "Paris",
    country: "France",
    duration: 5,
    coverImageId: 433, // Eiffel Tower area
    createdBy: {
      id: "user3",
      name: "Emma Laurent",
      avatar: "https://picsum.photos/id/15/100/100",
      isVerified: false,
    },
    createdAt: new Date("2024-09-28T10:00:00Z"),
    activities: [],
    totalCost: "premium",
    travelStyle: ["romance", "culture", "food", "relaxation"],
    bestFor: ["couple"],
    likes: 2134,
    saves: 1456,
    forks: 412,
    rating: 4.9,
    reviews: 203,
    tags: ["romantic", "eiffel-tower", "louvre", "seine", "fine-dining"],
    isPublic: true,
    isFeatured: true,
  },
  {
    id: "barcelona-adventure-4d",
    title: "Barcelona Adventure & Beach",
    description:
      "Mix of urban exploration and beach relaxation. Gaudí architecture, tapas tours, beach activities, and vibrant nightlife.",
    destination: "Barcelona",
    country: "Spain",
    duration: 4,
    coverImageId: 501, // Architecture
    createdBy: {
      id: "user4",
      name: "Carlos Mendez",
      avatar: "https://picsum.photos/id/203/100/100",
      isVerified: true,
    },
    createdAt: new Date("2024-09-20T10:00:00Z"),
    activities: [],
    totalCost: "moderate",
    travelStyle: ["adventure", "beach", "culture", "nightlife"],
    bestFor: ["friends", "couple"],
    likes: 1567,
    saves: 1023,
    forks: 298,
    rating: 4.7,
    reviews: 178,
    tags: ["gaudi", "beach", "tapas", "nightlife", "architecture"],
    isPublic: true,
    isFeatured: false,
  },
  {
    id: "amsterdam-budget-3d",
    title: "Budget-Friendly Amsterdam",
    description:
      "Explore Amsterdam without breaking the bank. Free museums, bike tours, local markets, and affordable eateries.",
    destination: "Amsterdam",
    country: "Netherlands",
    duration: 3,
    coverImageId: 628, // Canals
    createdBy: {
      id: "user5",
      name: "Lisa van der Berg",
      avatar: "https://picsum.photos/id/22/100/100",
      isVerified: false,
    },
    createdAt: new Date("2024-10-02T10:00:00Z"),
    activities: [],
    totalCost: "budget",
    travelStyle: ["culture", "budget", "cycling", "relaxation"],
    bestFor: ["solo", "friends", "family"],
    likes: 789,
    saves: 562,
    forks: 167,
    rating: 4.6,
    reviews: 89,
    tags: ["budget", "cycling", "canals", "museums", "markets"],
    isPublic: true,
    isFeatured: false,
  },
  {
    id: "tokyo-traditional-7d",
    title: "Traditional & Modern Tokyo",
    description:
      "Week-long journey through Tokyo's contrasts - ancient temples, modern technology, traditional cuisine, and pop culture.",
    destination: "Tokyo",
    country: "Japan",
    duration: 7,
    coverImageId: 292, // Asian architecture
    createdBy: {
      id: "user6",
      name: "Yuki Tanaka",
      avatar: "https://picsum.photos/id/342/100/100",
      isVerified: true,
    },
    createdAt: new Date("2024-09-25T10:00:00Z"),
    activities: [],
    totalCost: "premium",
    travelStyle: ["culture", "food", "technology", "tradition"],
    bestFor: ["solo", "couple", "friends"],
    likes: 3456,
    saves: 2341,
    forks: 678,
    rating: 5.0,
    reviews: 412,
    tags: ["temples", "sushi", "technology", "tradition", "anime"],
    isPublic: true,
    isFeatured: true,
  },
  {
    id: "rome-family-5d",
    title: "Family-Friendly Rome",
    description:
      "Kid-approved Roman adventure with interactive history, gelato stops, and family restaurants. Educational and fun!",
    destination: "Rome",
    country: "Italy",
    duration: 5,
    coverImageId: 152, // Colosseum-like
    createdBy: {
      id: "user7",
      name: "Antonio Bianchi",
      avatar: "https://picsum.photos/id/177/100/100",
      isVerified: false,
    },
    createdAt: new Date("2024-09-18T10:00:00Z"),
    activities: [],
    totalCost: "moderate",
    travelStyle: ["family", "history", "food", "culture"],
    bestFor: ["family"],
    likes: 1123,
    saves: 892,
    forks: 245,
    rating: 4.8,
    reviews: 167,
    tags: ["family", "colosseum", "vatican", "gelato", "history"],
    isPublic: true,
    isFeatured: false,
  },
  {
    id: "istanbul-mystical-4d",
    title: "Mystical Istanbul Experience",
    description:
      "Discover where East meets West. Bazaars, mosques, Bosphorus, Turkish baths, and authentic local cuisine.",
    destination: "Istanbul",
    country: "Turkey",
    duration: 4,
    coverImageId: 564, // Historic architecture
    createdBy: {
      id: "user8",
      name: "Ayşe Demir",
      avatar: "https://picsum.photos/id/399/100/100",
      isVerified: true,
    },
    createdAt: new Date("2024-09-30T10:00:00Z"),
    activities: [],
    totalCost: "budget",
    travelStyle: ["culture", "history", "food", "shopping"],
    bestFor: ["solo", "couple", "friends"],
    likes: 1876,
    saves: 1234,
    forks: 356,
    rating: 4.9,
    reviews: 234,
    tags: ["bazaar", "mosque", "bosphorus", "turkish-bath", "authentic"],
    isPublic: true,
    isFeatured: true,
  },
];

export async function fetchTemplates(filter?: {
  destination?: string;
  duration?: number;
  sortBy?: "popular" | "recent" | "rating";
}): Promise<TripTemplate[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 400));

  let filtered = [...mockTemplates];

  if (filter?.destination) {
    filtered = filtered.filter((t) =>
      t.destination.toLowerCase().includes(filter.destination!.toLowerCase())
    );
  }

  if (filter?.duration) {
    filtered = filtered.filter((t) => t.duration === filter.duration);
  }

  if (filter?.sortBy === "popular") {
    filtered.sort((a, b) => b.likes - a.likes);
  } else if (filter?.sortBy === "recent") {
    filtered.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
  } else if (filter?.sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}

export async function fetchTemplateById(id: string): Promise<TripTemplate | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockTemplates.find((t) => t.id === id) || null;
}
