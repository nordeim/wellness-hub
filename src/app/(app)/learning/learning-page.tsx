"use client";

import * as React from "react";
import { Filter, Play, Search, Video } from "lucide-react";
import { useWellnessStore } from "@/stores/wellness-store";
import { toast } from "@/components/ui/toast";
import { PageHeader, LoadingBlock, OptionChip, EmptyState } from "@/components/shared/page-parts";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PAGE_THEMES, SECTION_CARD, TOOLBAR, TUTORIAL_CARD } from "@/lib/page-layout";
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

      {/* The toolbar — search + category combobox (WH-24: the reference's
          stock family — the Input + pl-10, the Filter-icon wrapper, the
          fixed w-48, the gap-4/md container). */}
      <div className={TOOLBAR.container}>
        <div className={TOOLBAR.searchWrap}>
          <Search className={TOOLBAR.searchIcon} aria-hidden="true" />
          <Input
            type="search"
            aria-label="Search tutorials"
            placeholder="Search tutorials..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className={TOOLBAR.selectsWrap}>
          <Filter className={TOOLBAR.filterIcon} aria-hidden="true" />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-48" aria-label="Filter by category">
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
      </div>

      {filtered.length === 0 ? (
        <div className={SECTION_CARD.card}>
          <EmptyState hint="No tutorials found. Try a different search!" />
        </div>
      ) : (
        <div className={TUTORIAL_CARD.grid}>
          {filtered.map((t) => {
            const c = tutorialCategoryMeta(t.category);
            const d = tutorialDifficultyMeta(t.difficulty);
            return (
              <div key={t.id} className={TUTORIAL_CARD.card}>
                {/* WH-24: the reference's group-hover REVEAL cover — the img
                    scales 1.05, the scrim goes 20% black, the Watch Now
                    rectangle fades in (our permanent scrim + always-visible
                    pill retired — probed live with a real pointer). */}
                <div className={TUTORIAL_CARD.cover}>
                  {t.thumbnail ? (
                    <img src={t.thumbnail} alt={t.title} className={TUTORIAL_CARD.img} loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <Video className="h-10 w-10" aria-hidden="true" />
                    </div>
                  )}
                  <div className={TUTORIAL_CARD.overlay}>
                    <button
                      type="button"
                      className={TUTORIAL_CARD.watchBtn}
                      onClick={() => void watch(t.id, t.videoUrl, t.title)}
                      aria-label={`Watch Now: ${t.title}`}
                    >
                      <Play className="h-5 w-5 mr-2" /> Watch Now
                    </button>
                  </div>
                  {t.duration && <span className={TUTORIAL_CARD.duration}>{t.duration}</span>}
                </div>
                <div className={TUTORIAL_CARD.header}>
                  <div className={TUTORIAL_CARD.titleRow}>
                    {/* WH-29 (F-D): the reference's title is a bare DIV —
                        our h3 + text-foreground retire (computed-equal;
                        the tag vocabulary is the parity target). */}
                    <div className={TUTORIAL_CARD.title}>{t.title}</div>
                  </div>
                  <div className={TUTORIAL_CARD.chipsRow}>
                    <OptionChip label={c.label} tint={c.tint} text={c.text} />
                    {/* WH-29 (F-B): the difficulty chip rides the OUTLINE
                        Badge family — a plain visible border, no shadow,
                        no hover arm (the reference's own variant split,
                        decoded live: 12 instances). */}
                    <OptionChip label={d.label} tint={d.tint} text={d.text} variant="outline" />
                  </div>
                </div>
                <div className={TUTORIAL_CARD.body}>
                  <p className={TUTORIAL_CARD.desc}>{t.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}
