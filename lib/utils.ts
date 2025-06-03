import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Rocket,
  Calculator,
  Ruler,
  ArrowsDownUp,
  ArrowsLeftRight,
  Scales,
  CurrencyCircleDollar,
  PresentationChart,
} from "@phosphor-icons/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Map of chapter IDs to corresponding Phosphor icons
const chapterIcons = {
  1: Rocket,
  2: Calculator,
  3: Ruler,
  4: ArrowsLeftRight,
  5: ArrowsDownUp,
  6: Scales,
  7: CurrencyCircleDollar,
  8: PresentationChart,
};

// Get an icon for a chapter based on its ID
export function getChapterIcon(id: number) {
  // Use modulo to ensure we always get a valid icon
  const iconKey = (id % Object.keys(chapterIcons).length) + 1;
  return chapterIcons[iconKey as keyof typeof chapterIcons];
}