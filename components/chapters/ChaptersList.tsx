"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import { subjectsData } from "@/lib/data";
import ChapterItem from "@/components/chapters/ChapterItem";
import FilterChips from "@/components/filters/FilterChips";

interface ChaptersListProps {
  subject: string;
}

export default function ChaptersList({ subject }: ChaptersListProps) {
  const [classes, setClasses] = useState<string[]>([]);
  const [units, setUnits] = useState<string[]>([]);
  const [notStarted, setNotStarted] = useState(false);
  const [weakChapters, setWeakChapters] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const chapters = subjectsData[subject].chapters;
  
  // Get unique classes and units
  const uniqueClasses = useMemo(() => {
    return [...new Set(chapters.map(chapter => chapter.class))];
  }, [chapters]);
  
  const uniqueUnits = useMemo(() => {
    return [...new Set(chapters.map(chapter => chapter.unit))];
  }, [chapters]);
  
  // Filter chapters based on selected filters
  const filteredChapters = useMemo(() => {
    return chapters.filter(chapter => {
      const classMatch = classes.length === 0 || classes.includes(chapter.class);
      const unitMatch = units.length === 0 || units.includes(chapter.unit);
      const statusMatch = !notStarted || chapter.status === "not_started";
      const weakMatch = !weakChapters || chapter.isWeak;
      
      return classMatch && unitMatch && statusMatch && weakMatch;
    });
  }, [chapters, classes, units, notStarted, weakChapters]);
  
  // Sort chapters
  const sortedChapters = useMemo(() => {
    return [...filteredChapters].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }, [filteredChapters, sortOrder]);

  // Handle class filter change
  const handleClassChange = (value: string) => {
    if (classes.includes(value)) {
      setClasses(classes.filter(c => c !== value));
    } else {
      setClasses([...classes, value]);
    }
  };

  // Handle unit filter change
  const handleUnitChange = (value: string) => {
    if (units.includes(value)) {
      setUnits(units.filter(u => u !== value));
    } else {
      setUnits([...units, value]);
    }
  };

  // Toggle sort order
  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 md:gap-4">
        <div className="relative">
          <Select onValueChange={handleClassChange}>
            <SelectTrigger className="w-[100px] md:w-[120px]">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              {uniqueClasses.map((cls) => (
                <SelectItem key={cls} value={cls}>
                  {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {classes.length > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center" 
              variant="secondary"
            >
              {classes.length}
            </Badge>
          )}
        </div>

        <div className="relative">
          <Select onValueChange={handleUnitChange}>
            <SelectTrigger className="w-[100px] md:w-[120px]">
              <SelectValue placeholder="Units" />
            </SelectTrigger>
            <SelectContent>
              {uniqueUnits.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {units.length > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center" 
              variant="secondary"
            >
              {units.length}
            </Badge>
          )}
        </div>

        <Button
          variant={notStarted ? "default" : "outline"}
          size="sm"
          className="h-10"
          onClick={() => setNotStarted(!notStarted)}
        >
          Not Started
        </Button>

        <div className="flex items-center space-x-2">
          <Switch
            id="weak-chapters"
            checked={weakChapters}
            onCheckedChange={setWeakChapters}
          />
          <label
            htmlFor="weak-chapters"
            className="text-sm font-medium leading-none"
          >
            Weak Chapters
          </label>
        </div>
      </div>

      {(classes.length > 0 || units.length > 0) && (
        <FilterChips 
          classes={classes} 
          units={units} 
          onRemoveClass={(cls) => setClasses(classes.filter(c => c !== cls))}
          onRemoveUnit={(unit) => setUnits(units.filter(u => u !== unit))}
          onClearAll={() => {
            setClasses([]);
            setUnits([]);
          }}
        />
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing all chapters ({sortedChapters.length})
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={toggleSort}
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Sort
        </Button>
      </div>

      <div className="space-y-3">
        {sortedChapters.map((chapter) => (
          <ChapterItem key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </div>
  );
}