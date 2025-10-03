"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Plane, AlertCircle } from "lucide-react";
import { validatePrompt } from "@/utils/validation";
import { PlanChoiceModal } from "@/components/plan-choice-modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showChooser, setShowChooser] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const maybeError = validatePrompt(prompt);
    if (maybeError) {
      setError(maybeError);
      setShowChooser(false);
      return;
    }
    setError(null);
    setShowChooser(true);
  }

  const examplePrompts = [
    "I want to go from Istanbul to Berlin, I will stay for 4 days",
    "Planning a week-long trip to Paris with my family",
    "Weekend getaway to Barcelona, looking for cultural experiences",
  ];

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    setError(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="text-center space-y-4 pt-4 sm:pt-6 md:pt-8">
        <Badge variant="secondary" className="mb-2">
          <Sparkles className="h-3 w-3 mr-1" />
          AI-Powered Travel Planning
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent px-4">
          Plan Your Perfect Trip
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Describe your dream journey and let our AI create a personalized itinerary tailored to
          your preferences, budget, and travel style.
        </p>
      </div>

      {/* Main Input Card */}
      <Card className="border-2 hover:border-primary/50 transition-colors duration-300 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            Tell us about your trip
          </CardTitle>
          <CardDescription>
            Include your destinations, travel dates, interests, and any special requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                className={`
                  w-full min-h-[100px] sm:min-h-[120px] px-3 sm:px-4 py-2 sm:py-3 
                  border-2 rounded-xl 
                  bg-background text-foreground 
                  resize-y leading-relaxed
                  transition-all duration-200
                  placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary/20
                  ${isFocused ? "border-primary shadow-lg" : "border-input"}
                  ${error ? "border-destructive" : ""}
                `}
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (error) setError(null);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="e.g. I want to go from Istanbul to Berlin for 4 days. I'm interested in history, local cuisine, and art museums. Looking for a mix of guided tours and free time to explore."
                aria-label="Trip planning prompt"
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                {prompt.length}/10000
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm animate-in slide-in-from-top duration-300"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full text-base sm:text-lg h-11 sm:h-12 shadow-md hover:shadow-lg transition-all"
              disabled={!prompt.trim()}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Start Planning
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Example Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Need inspiration?</CardTitle>
          <CardDescription>Try one of these example prompts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="w-full text-left p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all duration-200 text-sm group"
              >
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  &quot;{example}&quot;
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-4">
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <CardTitle className="text-base">🎯 Personalized</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Tailored recommendations based on your preferences and travel style
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <CardTitle className="text-base">⚡ Fast & Easy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get a complete itinerary in minutes, not hours of research
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <CardTitle className="text-base">🎨 Flexible</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Choose between step-by-step guidance or instant full plan
            </p>
          </CardContent>
        </Card>
      </div>

      {showChooser && (
        <PlanChoiceModal
          onClose={() => setShowChooser(false)}
          onChoose={(mode) => {
            setShowChooser(false);
            const params = new URLSearchParams({ prompt });
            router.push(`/plan/${mode}?${params.toString()}`);
          }}
        />
      )}
    </div>
  );
}
