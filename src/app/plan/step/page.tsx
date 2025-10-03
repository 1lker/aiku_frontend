"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Check, Clock, MapPin } from "lucide-react";
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

  useEffect(() => {
    let mounted = true;
    fetchMockQuestionnaire().then((q) => {
      if (mounted) setQuestions(q);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const isDone = questions ? current >= questions.length : false;
  const progress = questions ? (current / questions.length) * 100 : 0;

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

      // Animate selection
      await new Promise((resolve) => setTimeout(resolve, 300));

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

      // Animate transition to next question
      await new Promise((resolve) => setTimeout(resolve, 200));
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

    const items = questions.slice(0, answers.length);
    const overallStart = parseTimeToMinutes(items[0].startTime);
    const overallEnd = parseTimeToMinutes(items[items.length - 1].endTime);
    const total = overallEnd - overallStart;
    const colors = [
      "bg-emerald-400",
      "bg-blue-400",
      "bg-pink-400",
      "bg-amber-400",
      "bg-purple-400",
      "bg-rose-400",
      "bg-orange-400",
    ];

    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Your Daily Timeline
          </CardTitle>
          <CardDescription>
            Day {items[0].day} • {items[0].startTime} - {items[items.length - 1].endTime}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="relative h-16 rounded-lg bg-gradient-to-r from-muted/50 to-muted overflow-hidden border">
            {items.map((q, i) => {
              const start = parseTimeToMinutes(q.startTime);
              const end = parseTimeToMinutes(q.endTime);
              const leftPct = ((start - overallStart) / total) * 100;
              const widthPct = ((end - start) / total) * 100;
              const label = `${q.startTime}–${q.endTime}`;
              const optionText = q.options[answers[i]].text;

              return (
                <div
                  key={i}
                  className={cn(
                    "absolute top-0 bottom-0 border-r-2 border-white/90",
                    "flex items-center justify-center",
                    "text-foreground font-semibold text-xs",
                    "transition-all duration-300 hover:scale-y-105 hover:shadow-lg",
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
          <div className="mt-3 flex flex-wrap gap-2">
            {items.map((q, i) => (
              <Badge
                key={i}
                variant="secondary"
                className={cn(
                  "text-xs font-normal",
                  colors[i % colors.length],
                  "text-foreground border-white/50"
                )}
              >
                {q.startTime} - {q.endTime}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }, [answers, questions, parseTimeToMinutes]);

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
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Plan Step by Step</h1>
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

        {/* Progress Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Progress</span>
                <span className="text-muted-foreground">
                  {current} of {questions.length} questions
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
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <Badge variant="default" className="mb-2">
                    Day {questions[current].day}
                  </Badge>
                  <CardTitle className="text-2xl">What would you like to do?</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-base">
                    <Clock className="h-4 w-4" />
                    {questions[current].startTime} - {questions[current].endTime}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-lg px-4 py-2">
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
                      "cursor-pointer transition-all duration-300",
                      "hover:shadow-xl hover:scale-[1.02] hover:border-primary",
                      "active:scale-[0.98]",
                      selectedOption === i && "ring-2 ring-primary shadow-xl scale-[1.02]",
                      isAnimating && selectedOption !== i && "opacity-50"
                    )}
                    onClick={() => !isAnimating && handleSelect(i)}
                  >
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base leading-snug">{option.text}</CardTitle>
                        {selectedOption === i && (
                          <div className="shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center animate-in zoom-in duration-200">
                            <Check className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {option.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Navigation Buttons */}
              {current > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={isAnimating}
                    className="w-full sm:w-auto"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Question
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6 animate-in zoom-in duration-500">
          <Card className="border-2 border-primary shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl">All Set! 🎉</CardTitle>
              <CardDescription className="text-base">
                Your personalized itinerary has been created based on your selections
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-center text-muted-foreground">
                  We&apos;ve logged all your preferences step by step. You can now review your
                  complete travel plan or make adjustments.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button size="lg" onClick={() => router.push("/")} className="w-full sm:w-auto">
                    Back to Home
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

          {/* Summary Timeline */}
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
