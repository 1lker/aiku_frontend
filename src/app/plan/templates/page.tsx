"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Heart,
  Star,
  Users,
  MapPin,
  ChevronLeft,
  Sparkles,
  GitFork,
} from "lucide-react";
import { templatesApi } from "@/services/api";
import type { TripTemplate } from "@/types/template";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<TripTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"popular" | "recent" | "rating">("popular");

  useEffect(() => {
    loadTemplates();
  }, [selectedFilter]);

  async function loadTemplates() {
    setIsLoading(true);
    try {
      const response = await templatesApi.getAll({ sortBy: selectedFilter });
      setTemplates(response.data);
    } catch (error) {
      console.error("Failed to load templates:", error);
      setTemplates([]);
    }
    setIsLoading(false);
  }

  const filteredTemplates = templates.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCostColor = (cost?: string) => {
    switch (cost) {
      case "budget":
        return "text-green-600 bg-green-50";
      case "moderate":
        return "text-blue-600 bg-blue-50";
      case "premium":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              Trip Templates
            </h1>
            <p className="text-muted-foreground">
              Discover and customize trips shared by travelers worldwide
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card>
            <CardContent className="pt-4 pb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{templates.length}</div>
                <div className="text-xs text-muted-foreground">Templates</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {new Set(templates.map((t) => t.destination)).size}
                </div>
                <div className="text-xs text-muted-foreground">Destinations</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {templates.reduce((sum, t) => sum + t.likes, 0).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Total Likes</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {templates.reduce((sum, t) => sum + t.forks, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Customized</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search destinations, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "popular" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("popular")}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Popular
              </Button>
              <Button
                variant={selectedFilter === "recent" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("recent")}
              >
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </Button>
              <Button
                variant={selectedFilter === "rating" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("rating")}
              >
                <Star className="h-4 w-4 mr-2" />
                Top Rated
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group overflow-hidden"
              onClick={() => router.push(`/plan/templates/${template.id}`)}
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={`https://picsum.photos/id/${template.coverImageId}/600/400`}
                  alt={template.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badges on Image */}
                <div className="absolute top-2 left-2 flex gap-2">
                  {template.isFeatured && (
                    <Badge className="bg-primary text-primary-foreground">⭐ Featured</Badge>
                  )}
                  <Badge className={cn("font-medium", getCostColor(template.totalCost))}>
                    {template.totalCost}
                  </Badge>
                </div>

                {/* Destination Badge */}
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur">
                    <MapPin className="h-3 w-3 mr-1" />
                    {template.destination}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg leading-tight line-clamp-2">
                  {template.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">{template.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Creator */}
                <div className="flex items-center gap-2">
                  {template.createdBy.avatar && (
                    <Image
                      src={template.createdBy.avatar}
                      alt={template.createdBy.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm text-muted-foreground">{template.createdBy.name}</span>
                  {template.createdBy.isVerified && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      ✓
                    </Badge>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.travelStyle.slice(0, 3).map((style, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {style}
                    </Badge>
                  ))}
                  {template.travelStyle.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.travelStyle.length - 3}
                    </Badge>
                  )}
                </div>

                <Separator />

                {/* Stats */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Clock className="h-3 w-3" />
                      {template.duration}
                    </div>
                    <div className="text-xs text-muted-foreground">days</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Heart className="h-3 w-3 text-red-500" />
                      {template.likes > 1000
                        ? `${(template.likes / 1000).toFixed(1)}k`
                        : template.likes}
                    </div>
                    <div className="text-xs text-muted-foreground">likes</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Star className="h-3 w-3 text-amber-500" />
                      {template.rating.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">rating</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <GitFork className="h-3 w-3 text-purple-500" />
                      {template.forks}
                    </div>
                    <div className="text-xs text-muted-foreground">forks</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredTemplates.length === 0 && !isLoading && (
        <Card>
          <CardContent className="py-12 text-center">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
