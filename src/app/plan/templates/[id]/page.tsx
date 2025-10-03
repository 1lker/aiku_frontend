"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  Heart,
  Share2,
  GitFork,
  Star,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Sparkles,
  Check,
} from "lucide-react";
import { templatesApi } from "@/services/api";
import type { TripTemplate } from "@/types/template";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState<TripTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadTemplate();
  }, [params.id]);

  async function loadTemplate() {
    setIsLoading(true);
    try {
      const response = await templatesApi.getById(params.id as string);
      setTemplate(response.data);
    } catch (error) {
      console.error("Failed to load template:", error);
      setTemplate(null);
    }
    setIsLoading(false);
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "breakfast":
        return "🥐";
      case "lunch":
        return "🍽️";
      case "dinner":
        return "🍷";
      case "culture":
        return "🏛️";
      case "activity":
        return "🎯";
      case "evening":
        return "🌆";
      case "nightlife":
        return "🌙";
      default:
        return "⭐";
    }
  };

  const getCostColor = (cost?: string) => {
    switch (cost) {
      case "budget":
        return "text-green-600 bg-green-50 border-green-200";
      case "moderate":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "premium":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const handleFork = async () => {
    if (!template) return;

    try {
      const response = await templatesApi.fork(template.id);
      console.log("Template forked:", response.data);
      alert(`Template forked successfully! New ID: ${response.data.id}`);
      // TODO: Navigate to customization page with forked template
      // router.push(`/plan/customize/${response.data.id}`);
    } catch (error) {
      console.error("Failed to fork template:", error);
      alert("Failed to fork template. Please try again.");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <h3 className="text-lg font-semibold mb-2">Template not found</h3>
          <Button onClick={() => router.push("/plan/templates")}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push("/plan/templates")}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Templates
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden">
        <Image
          src={`https://picsum.photos/id/${template.coverImageId}/1200/600`}
          alt={template.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Title on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {template.isFeatured && (
              <Badge className="bg-primary text-primary-foreground">⭐ Featured</Badge>
            )}
            <Badge className={cn("font-medium border", getCostColor(template.totalCost))}>
              <DollarSign className="h-3 w-3 mr-1" />
              {template.totalCost}
            </Badge>
            <Badge variant="secondary" className="bg-white/90 backdrop-blur">
              <Clock className="h-3 w-3 mr-1" />
              {template.duration} days
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            {template.title}
          </h1>
          <p className="text-white/90 text-lg max-w-3xl">{template.description}</p>
        </div>
      </div>

      {/* Actions Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Creator & Stats */}
            <div className="flex items-center gap-6 flex-wrap">
              {/* Creator */}
              <div className="flex items-center gap-2">
                {template.createdBy.avatar && (
                  <Image
                    src={template.createdBy.avatar}
                    alt={template.createdBy.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{template.createdBy.name}</span>
                    {template.createdBy.isVerified && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(template.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <Separator orientation="vertical" className="h-12 hidden sm:block" />

              {/* Stats */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Heart className={cn("h-5 w-5", isLiked && "fill-red-500 text-red-500")} />
                  <span className="font-semibold">{template.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <span className="font-semibold">{template.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground text-sm">
                    ({template.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold">{template.forks}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={async () => {
                  if (!template) return;
                  try {
                    if (isLiked) {
                      await templatesApi.unlike(template.id);
                    } else {
                      await templatesApi.like(template.id);
                    }
                    setIsLiked(!isLiked);
                  } catch (error) {
                    console.error("Failed to toggle like:", error);
                  }
                }}
                className={cn(isLiked && "border-red-500 text-red-500")}
              >
                <Heart className={cn("h-4 w-4 mr-2", isLiked && "fill-red-500")} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsSaved(!isSaved)}
                className={cn(isSaved && "border-primary text-primary")}
              >
                {isSaved ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleFork} size="lg" className="shadow-md">
                <GitFork className="h-4 w-4 mr-2" />
                Customize This Trip
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Trip Overview</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Destination</div>
                    <div className="text-muted-foreground">
                      {template.destination}, {template.country}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Duration</div>
                    <div className="text-muted-foreground">{template.duration} days</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Best For</div>
                    <div className="text-muted-foreground capitalize">
                      {template.bestFor.join(", ")}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Budget Level</div>
                    <div className="text-muted-foreground capitalize">{template.totalCost}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Travel Style */}
          <Card>
            <CardHeader>
              <CardTitle>Travel Style</CardTitle>
              <CardDescription>What to expect from this trip</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {template.travelStyle.map((style, i) => (
                  <Badge key={i} variant="secondary" className="text-sm px-3 py-1">
                    {style}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sample Itinerary Preview */}
          <Card>
            <CardHeader>
              <CardTitle>What&apos;s Included</CardTitle>
              <CardDescription>
                This {template.duration}-day itinerary covers all the highlights
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Day-by-Day Itinerary</div>
                    <div className="text-sm text-muted-foreground">
                      Detailed schedule for each day with timing and locations
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Location Recommendations</div>
                    <div className="text-sm text-muted-foreground">
                      Restaurants, attractions, and hidden gems with addresses
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Travel Tips</div>
                    <div className="text-sm text-muted-foreground">
                      Insider advice on transportation, booking, and local customs
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - CTA & Tags */}
        <div className="space-y-6">
          {/* Main CTA */}
          <Card className="border-2 border-primary/20 shadow-lg sticky top-6">
            <CardHeader>
              <CardTitle>Start Planning</CardTitle>
              <CardDescription>Customize this template for your trip</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-4">
              <Button onClick={handleFork} size="lg" className="w-full shadow-md">
                <GitFork className="h-5 w-5 mr-2" />
                Customize This Trip
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                You can modify destinations, activities, and timing to match your preferences
              </p>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Already used by</span>
                  <span className="font-semibold">{template.forks} travelers</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average rating</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    {template.rating.toFixed(1)}/5.0
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
