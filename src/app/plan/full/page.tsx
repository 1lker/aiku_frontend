"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Calendar,
  Check,
  Sparkles,
  Share2,
  Edit3,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Question } from "@/utils/questionnaire";

function FullPlanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prompt = searchParams.get("prompt");
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [answers, setAnswers] = useState<number[][]>([]);
  const [isReviseMode, setIsReviseMode] = useState(false);
  const [newPrompt, setNewPrompt] = useState("");
  const totalDays = 3;

  // Mock data generation
  useEffect(() => {
    const loadMockData = async () => {
      // Wait for 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate mock questions and answers
      const mockQuestions: Question[] = [
        {
          day: 1,
          startTime: "08:00",
          endTime: "10:00",
          category: "breakfast",
          options: [
            { text: "Café Einstein", description: "Classic Viennese coffeehouse", imageId: 1 },
            { text: "Benedict", description: "All-day breakfast spot", imageId: 2 },
          ],
        },
        {
          day: 1,
          startTime: "10:00",
          endTime: "13:00",
          category: "culture",
          options: [
            { text: "Brandenburg Gate", description: "Iconic landmark", imageId: 3 },
            { text: "Reichstag Building", description: "Historic parliament", imageId: 4 },
          ],
        },
        {
          day: 1,
          startTime: "13:00",
          endTime: "15:00",
          category: "lunch",
          options: [
            { text: "Curry 36", description: "Famous currywurst", imageId: 5 },
            { text: "Markthalle Neun", description: "Food market", imageId: 6 },
          ],
        },
        {
          day: 2,
          startTime: "09:00",
          endTime: "12:00",
          category: "culture",
          options: [
            { text: "Museum Island", description: "UNESCO World Heritage", imageId: 7 },
            { text: "Berlin Wall Memorial", description: "Historical site", imageId: 8 },
          ],
        },
        {
          day: 2,
          startTime: "12:00",
          endTime: "14:00",
          category: "lunch",
          options: [
            { text: "Burgermeister", description: "Under the train tracks", imageId: 9 },
            { text: "Döner Kebab", description: "Turkish classic", imageId: 10 },
          ],
        },
        {
          day: 3,
          startTime: "10:00",
          endTime: "13:00",
          category: "activity",
          options: [
            { text: "East Side Gallery", description: "Open-air gallery", imageId: 11 },
            { text: "Tempelhof Park", description: "Former airport", imageId: 12 },
          ],
        },
      ];

      // Mock answers - select first option for each question
      const mockAnswers: number[][] = mockQuestions.map(() => [0]);

      setQuestions(mockQuestions);
      setAnswers(mockAnswers);
      setIsLoading(false);
    };

    loadMockData();
  }, []);

  const getCategoryIcon = useCallback((category?: string) => {
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
  }, []);

  const parseTimeToMinutes = useCallback((t: string): number => {
    const [hh, mm] = t.split(":").map((v) => parseInt(v, 10));
    return hh * 60 + mm;
  }, []);

  const handleShare = useCallback(async () => {
    if (!questions || !answers.length) return;

    console.log("Sharing plan:", { questions, answers, totalDays });
    await new Promise((resolve) => setTimeout(resolve, 500));

    alert("Plan shared successfully! (Mock functionality)");
  }, [questions, answers, totalDays]);

  const handleRevisePlan = useCallback(() => {
    if (!questions || !answers.length) return;

    setIsReviseMode(true);
    setNewPrompt(prompt || "");
  }, [questions, answers.length, prompt]);

  const handleNewPromptSubmit = useCallback(async () => {
    if (!newPrompt.trim()) return;

    console.log("New prompt submitted:", newPrompt);

    setIsReviseMode(false);
    setNewPrompt("");

    alert(`New prompt logged to console: "${newPrompt}"`);
  }, [newPrompt]);

  const handleCancelRevise = useCallback(() => {
    setIsReviseMode(false);
    setNewPrompt("");
  }, []);

  const renderTimeline = useCallback(() => {
    if (!answers.length || !questions) return null;

    const answeredQuestions = questions.slice(0, answers.length);
    const dayGroups = answeredQuestions.reduce(
      (acc, q, i) => {
        if (!acc[q.day]) acc[q.day] = [];
        const answerIndices = answers[i];
        const primaryAnswerIndex = Array.isArray(answerIndices) ? answerIndices[0] : answerIndices;
        acc[q.day].push({
          question: q,
          answerIndex: primaryAnswerIndex,
          answerIndices: answerIndices,
          index: i,
        });
        return acc;
      },
      {} as Record<
        number,
        Array<{
          question: Question;
          answerIndex: number;
          answerIndices: number | number[];
          index: number;
        }>
      >
    );

    const colors = [
      "bg-emerald-400",
      "bg-blue-400",
      "bg-pink-400",
      "bg-amber-400",
      "bg-purple-400",
      "bg-rose-400",
      "bg-orange-400",
      "bg-cyan-400",
      "bg-indigo-400",
    ];

    return (
      <div className="space-y-4">
        {Object.entries(dayGroups).map(([day, items]) => {
          const overallStart = parseTimeToMinutes(items[0].question.startTime);
          const overallEnd = parseTimeToMinutes(items[items.length - 1].question.endTime);
          const total = overallEnd - overallStart;

          return (
            <Card key={day} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Day {day}</CardTitle>
                  </div>
                  <Badge variant="secondary">
                    {items.length} {items.length === 1 ? "activity" : "activities"}
                  </Badge>
                </div>
                <CardDescription>
                  {items[0].question.startTime} - {items[items.length - 1].question.endTime}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="relative h-16 rounded-lg bg-gradient-to-r from-muted/50 to-muted overflow-hidden border">
                  {items.map(({ question, answerIndex, index: i }) => {
                    const start = parseTimeToMinutes(question.startTime);
                    const end = parseTimeToMinutes(question.endTime);
                    const leftPct = ((start - overallStart) / total) * 100;
                    const widthPct = ((end - start) / total) * 100;
                    const label = `${question.startTime}–${question.endTime}`;
                    const optionText = question.options[answerIndex].text;

                    return (
                      <div
                        key={i}
                        className={cn(
                          "absolute top-0 bottom-0 border-r-2 border-white/90",
                          "flex items-center justify-center",
                          "text-foreground font-semibold text-xs",
                          "transition-all duration-300 hover:scale-y-105 hover:shadow-lg hover:z-10",
                          "cursor-pointer group",
                          colors[i % colors.length]
                        )}
                        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                        title={`${label}\n${optionText}`}
                      >
                        <span className="px-2 truncate">{label}</span>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                      </div>
                    );
                  })}
                </div>
                <div
                  className="mt-3 relative"
                  style={{
                    minHeight: `${
                      Math.max(
                        ...items.map(({ answerIndices }) => {
                          const indices = Array.isArray(answerIndices)
                            ? answerIndices
                            : [answerIndices];
                          return indices.length;
                        })
                      ) * 68
                    }px`,
                  }}
                >
                  {items.map(({ question, answerIndices, index: i }) => {
                    const indices = Array.isArray(answerIndices) ? answerIndices : [answerIndices];
                    const start = parseTimeToMinutes(question.startTime);
                    const end = parseTimeToMinutes(question.endTime);
                    const leftPct = ((start - overallStart) / total) * 100;
                    const widthPct = ((end - start) / total) * 100;

                    const paddingPct = 1;
                    const adjustedLeftPct = leftPct + paddingPct;
                    const adjustedWidthPct = widthPct - paddingPct * 2;

                    return indices.map((answerIndex, subIndex) => (
                      <div
                        key={`${i}-${subIndex}`}
                        className="absolute p-1.5 rounded-lg border bg-card hover:shadow-md transition-shadow z-10"
                        style={{
                          left: `${adjustedLeftPct}%`,
                          width: `${adjustedWidthPct}%`,
                          top: `${subIndex * 68}px`,
                        }}
                      >
                        <div className="flex items-start gap-1.5">
                          <span className="text-base shrink-0">
                            {getCategoryIcon(question.category)}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-muted-foreground">
                              {question.startTime} - {question.endTime}
                            </p>
                            <p className="text-sm font-medium truncate mt-0.5">
                              {question.options[answerIndex].text.split(/[,.-]/)[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ));
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }, [answers, questions, parseTimeToMinutes, getCategoryIcon]);

  if (isLoading) {
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
                  Best travel options are being analyzed...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Your Berlin Adventure Awaits! 🎉</h1>
            {prompt && (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{prompt}</span>
              </p>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="gap-1">
                <Calendar className="h-3 w-3" />
                {totalDays} Days
              </Badge>
              <Badge variant="outline">{answers.length} Activities</Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="shrink-0">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
      </div>

      {/* Completion Section */}
      {!isReviseMode && (
        <Card className="border-2 border-primary shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
              <Check className="h-10 w-10 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Your Complete Itinerary is Ready!</CardTitle>
            <CardDescription className="text-base max-w-2xl mx-auto">
              We&apos;ve created your perfect {totalDays}-day Berlin adventure. Review your timeline
              below.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={() => router.push("/")} className="w-full sm:w-auto">
                <MapPin className="h-4 w-4 mr-2" />
                Plan Another Trip
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleShare}
                className="w-full sm:w-auto"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Plan
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleRevisePlan}
                className="w-full sm:w-auto"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Revise Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Revise Plan Interface */}
      {isReviseMode && (
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Revise Your Plan</CardTitle>
            </div>
            <CardDescription>
              Provide a new prompt to regenerate your plan with different preferences.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Prompt</label>
                <textarea
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="Describe what you'd like to change about your plan..."
                  className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleNewPromptSubmit}
                  disabled={!newPrompt.trim()}
                  className="flex-1 sm:flex-none"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Regenerate Plan
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancelRevise}
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      {renderTimeline()}
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
