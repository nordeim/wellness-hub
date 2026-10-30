"use client";

import * as React from "react";
import { Play, Search, Video } from "lucide-react";
import { useWellnessStore } from "@/stores/wellness-store";
import { toast } from "@/components/ui/toast";
import { PageHeader, LoadingBlock, OptionChip, EmptyState } from "@/components/shared/page-parts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PAGE_THEMES, SECTION_CARD } from "@/lib/page-layout";
import {
  TUTORIAL_CATEGORIES,
  TUTORIAL_DIFFICULTIES,
  tutorialCategoryMeta,
  tutorialDifficultyMeta,
} from "@/lib/constants";
import { matchesQuery } from "@/lib/wellness";
import { cn } from "@/lib/utils";

export default function LearningClientPage() {
  const { tutorials, hydrated, fetchTutorials, viewTutorial } = useWellnessStore();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("all");

  React.useEffect(() => {
    if (!hydrated) return;
    void fetchTutorials();
  }, [hydrated, fetchTutorials]);

  const watch = async (id: string, videoUrl: string | null, title: string) => {
    const res = await viewTutorial(id);
    if (!res.ok) toast.error(res.error);
    if (videoUrl) {
      window.open(videoUrl, "_blank", "noopener,noreferrer");
    } else {
      toast.info(`"${title}" has no video link yet — coming soon! 🎬`);
    }
  };

  const filtered = tutorials.filter(
    (t) =>
      (category === "all" || t.category === category) &&
      matchesQuery(query, [t.title, t.description]),
  );

  if (!hydrated) {
    return (
      <div className={PAGE_THEMES.learning.root}>
        <LoadingBlock label="Loading tutorials…" />
      </div>
    );
  }

  return (
    <div className={PAGE_THEMES.learning.root}>
      <div className={PAGE_THEMES.learning.container}>
      <PageHeader title="Learning Center" subtitle="Explore helpful tutorials and resources" theme={PAGE_THEMES.learning} />

      {/* The toolbar — search + category combobox. */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            aria-label="Search tutorials"
            placeholder="Search tutorials..."
            className="flex h-9 w-full rounded-md border border-line bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-48" aria-label="Filter by category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {TUTORIAL_CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className={SECTION_CARD.card}>
          <EmptyState icon={Video} hint="No tutorials found. Try a different search!" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((t) => {
            const c = tutorialCategoryMeta(t.category);
            const d = tutorialDifficultyMeta(t.difficulty);
            return (
              <section
                key={t.id}
                className="overflow-hidden rounded-xl border-none bg-surface shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                  {t.thumbnail ? (
                    <img src={t.thumbnail} alt={t.title} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <Video className="h-10 w-10" aria-hidden="true" />
                    </div>
                  )}
                  {t.duration && (
                    <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white">
                      {t.duration}
                    </span>
                  )}
                  <button
                    type="button"
                    className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => void watch(t.id, t.videoUrl, t.title)}
                    aria-label={`Watch Now: ${t.title}`}
                  >
                    <span className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg">
                      <Play className="h-4 w-4" /> Watch Now
                    </span>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{t.title}</h3>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <OptionChip label={c.label} tint={c.tint} text={c.text} />
                    <OptionChip label={d.label} tint={d.tint} text={d.text} />
                  </div>
                  <p className="mt-2 text-sm text-muted">{t.description}</p>
                </div>
              </section>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}
