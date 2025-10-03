"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Check, Clock, MapPin, Calendar, Sparkles } from "lucide-react";
import Image from "next/image";
import {
  fetchMockQuestionnaire,
  mockSubmitSelection,
  mockLogSelectionContents,
  type Question,
} from "@/utils/questionnaire";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function StepPlannerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prompt = searchParams.get("prompt");
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [totalDays, setTotalDays] = useState(3);

  useEffect(() => {
    let mounted = true;
    fetchMockQuestionnaire(totalDays).then((q) => {
      if (mounted) setQuestions(q);
    });
    return () => {
      mounted = false;
    };
  }, [totalDays]);

  const isDone = questions ? current >= questions.length : false;
  const progress = questions ? (current / questions.length) * 100 : 0;

  const getCategoryIcon = (category?: string) => {
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

  const parseTimeToMinutes = useCallback((t: string): number => {
    const [hh, mm] = t.split(":").map((v) => parseInt(v, 10));
    return hh * 60 + mm;
  }, []);

  const handleSelect = useCallback(
    async (optionIndex: number) => {
      if (!questions || isAnimating) return;

      const question = questions[current];
      const option = question.options[optionIndex];

      setIsAnimating(true);
      setSelectedOption(optionIndex);

      await new Promise((resolve) => setTimeout(resolve, 400));

      await mockLogSelectionContents(current, option, {
        day: question.day,
        startTime: question.startTime,
        endTime: question.endTime,
      });
      await mockSubmitSelection(current, option, {
        day: question.day,
        startTime: question.startTime,
        endTime: question.endTime,
      });

      setAnswers((prev) => {
        const next = [...prev];
        next[current] = optionIndex;
        return next;
      });

      await new Promise((resolve) => setTimeout(resolve, 300));
      setCurrent((c) => c + 1);
      setSelectedOption(null);
      setIsAnimating(false);
    },
    [questions, current, isAnimating]
  );

  const handlePrevious = useCallback(() => {
    if (current > 0 && !isAnimating) {
      setCurrent((c) => c - 1);
    }
  }, [current, isAnimating]);

  const renderTimeline = useCallback(() => {
    if (!answers.length || !questions) return null;

    const answeredQuestions = questions.slice(0, answers.length);
    const dayGroups = answeredQuestions.reduce(
      (acc, q, i) => {
        if (!acc[q.day]) acc[q.day] = [];
        acc[q.day].push({ question: q, answerIndex: answers[i], index: i });
        return acc;
      },
      {} as Record<number, Array<{ question: Question; answerIndex: number; index: number }>>
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
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {items.map(({ question, answerIndex, index: i }) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg shrink-0">
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
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }, [answers, questions, parseTimeToMinutes, getCategoryIcon]);

  if (!questions) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Plan Step by Step</CardTitle>
            <CardDescription>Loading your personalized questions...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
            <h1 className="text-3xl font-bold tracking-tight">Plan Your Berlin Adventure</h1>
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
              <Badge variant="outline">{questions.length} Decisions</Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="shrink-0">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Building Your Itinerary
                </span>
                <span className="text-muted-foreground">
                  {current} of {questions.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {Math.round(progress)}% complete
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      {answers.length > 0 && (
        <div className="animate-in slide-in-from-top duration-500">{renderTimeline()}</div>
      )}

      {/* Question Section */}
      {!isDone ? (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="default" className="text-base px-3 py-1">
                      Day {questions[current].day}
                    </Badge>
                    <Badge variant="outline" className="text-base px-3 py-1">
                      {getCategoryIcon(questions[current].category)} {questions[current].category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">Choose Your Experience</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-base">
                    <Clock className="h-4 w-4" />
                    {questions[current].startTime} - {questions[current].endTime}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {current + 1}/{questions.length}
                </Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[current].options.map((option, i) => (
                  <Card
                    key={i}
                    className={cn(
                      "cursor-pointer transition-all duration-300 overflow-hidden",
                      "hover:shadow-2xl hover:scale-[1.02] hover:border-primary",
                      "active:scale-[0.98]",
                      selectedOption === i &&
                        "ring-2 ring-primary shadow-2xl scale-[1.02] border-primary",
                      isAnimating && selectedOption !== i && "opacity-50"
                    )}
                    onClick={() => !isAnimating && handleSelect(i)}
                  >
                    {option.imageId && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={`https://picsum.photos/id/${option.imageId}/600/400`}
                          alt={option.text}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {selectedOption === i && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center animate-in zoom-in duration-200">
                              <Check className="h-8 w-8 text-primary-foreground" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base leading-snug">{option.text}</CardTitle>
                        {!option.imageId && selectedOption === i && (
                          <div className="shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center animate-in zoom-in duration-200">
                            <Check className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {option.description}
                      </CardDescription>
                      {option.tags && option.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2">
                          {option.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Navigation Buttons */}
              {current > 0 && (
                <div className="mt-6 pt-6 border-t flex gap-3">
                  <Button variant="outline" onClick={handlePrevious} disabled={isAnimating}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <div className="text-sm text-muted-foreground flex items-center">
                    Want to change your previous choice?
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6 animate-in zoom-in duration-500">
          <Card className="border-2 border-primary shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
                <Check className="h-10 w-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl">Your Berlin Adventure Awaits! 🎉</CardTitle>
              <CardDescription className="text-base max-w-2xl mx-auto">
                Congratulations! We&apos;ve created your perfect {totalDays}-day itinerary based on
                your preferences. Review your personalized timeline below.
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{totalDays}</div>
                    <div className="text-sm text-muted-foreground">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{answers.length}</div>
                    <div className="text-sm text-muted-foreground">Activities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {new Set(questions.map((q) => q.category)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Complete</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button size="lg" onClick={() => router.push("/")} className="w-full sm:w-auto">
                    <MapPin className="h-4 w-4 mr-2" />
                    Plan Another Trip
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setCurrent(0);
                      setAnswers([]);
                    }}
                    className="w-full sm:w-auto"
                  >
                    Start Over
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Timeline */}
          {renderTimeline()}
        </div>
      )}
    </div>
  );
}

export default function StepPlanner() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Plan Step by Step</CardTitle>
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
      <StepPlannerContent />
    </Suspense>
  );
}
