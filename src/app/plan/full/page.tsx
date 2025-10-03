"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Plane, Hotel, Utensils, Camera, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function FullPlanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prompt = searchParams.get("prompt");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Full Trip Plan</h1>
            {prompt && (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{prompt}</span>
              </p>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="shrink-0">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Status Card */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Plane className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <div>
              <CardTitle>Creating Your Complete Itinerary</CardTitle>
              <CardDescription>
                Our AI is crafting a personalized travel plan just for you
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* What's Included Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">What&apos;s Included in Your Full Plan</CardTitle>
          <CardDescription>
            Your comprehensive itinerary will include all these elements
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Plane className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Flight Options</h3>
                <p className="text-sm text-muted-foreground">
                  Best flight routes and times based on your dates and budget
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Hotel className="h-6 w-6 text-blue-500" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Accommodation</h3>
                <p className="text-sm text-muted-foreground">
                  Hotels and stays perfectly located near your activities
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                <Camera className="h-6 w-6 text-orange-500" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Activities & Tours</h3>
                <p className="text-sm text-muted-foreground">
                  Curated experiences matching your interests
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                <Utensils className="h-6 w-6 text-pink-500" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Dining Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Local restaurants and must-try cuisines
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                <Calendar className="h-6 w-6 text-purple-500" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Daily Schedule</h3>
                <p className="text-sm text-muted-foreground">
                  Hour-by-hour itinerary optimized for efficiency
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6 text-emerald-500" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Maps & Navigation</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive maps with all your destinations marked
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      {prompt && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Your Trip Details
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Original Request
                </Badge>
                <div className="p-4 rounded-lg bg-muted/50 text-sm leading-relaxed">{prompt}</div>
              </div>
              <p className="text-sm text-muted-foreground">
                We&apos;re analyzing your requirements and creating a personalized itinerary that
                matches your travel style, budget, and preferences.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      <Card className="border-2 border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Processing Your Request</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                This feature is being prepared. In the meantime, you can try our step-by-step
                planner for a more guided experience.
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const params = prompt ? `?prompt=${encodeURIComponent(prompt)}` : "";
                router.push(`/plan/step${params}`);
              }}
            >
              Try Step-by-Step Planner
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function FullPlan() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Full Trip Plan</CardTitle>
              <CardDescription>Loading...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <FullPlanContent />
    </Suspense>
  );
}
