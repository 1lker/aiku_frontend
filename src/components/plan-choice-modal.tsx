"use client";

import { Layers, Zap, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Mode = "step" | "full";

interface PlanChoiceModalProps {
  onClose: () => void;
  onChoose: (mode: Mode) => void;
}

export function PlanChoiceModal({ onClose, onChoose }: PlanChoiceModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="plan-choice-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl animate-in zoom-in-95 duration-300"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-2 shadow-2xl">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 sm:right-4 top-2 sm:top-4"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
            <CardTitle id="plan-choice-title" className="text-xl sm:text-2xl pr-10">
              Choose Your Planning Style
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Select the approach that works best for you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step by Step Option */}
            <Card
              className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary border-2 group"
              onClick={() => onChoose("step")}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg sm:text-xl">Step by Step</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        Recommended
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Answer guided questions about your preferences, budget, and interests. Perfect for
                  travelers who want a personalized experience with full control over every detail.
                </CardDescription>
                <div className="space-y-2 pt-2">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-bold">✓</span>
                    <span>Interactive questionnaire for each time slot</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-bold">✓</span>
                    <span>Visual timeline of your selections</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-bold">✓</span>
                    <span>Fine-tune every aspect of your trip</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg">
                  <Layers className="h-4 w-4 mr-2" />
                  Start Step by Step
                </Button>
              </CardContent>
            </Card>

            {/* Full Plan Option */}
            <Card
              className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary border-2 group"
              onClick={() => onChoose("full")}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <Zap className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Full Plan</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        Quick Start
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Get an instant, complete itinerary including flights, accommodations, activities,
                  and daily schedule. Great for travelers who prefer a ready-made plan to refine
                  later.
                </CardDescription>
                <div className="space-y-2 pt-2">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Instant comprehensive itinerary</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Flight and accommodation suggestions</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Complete daily schedule with activities</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full" size="lg">
                  <Zap className="h-4 w-4 mr-2" />
                  Get Full Plan
                </Button>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground pt-2">
              Don&apos;t worry, you can always switch between modes later
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
