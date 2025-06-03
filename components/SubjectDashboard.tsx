"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import ChaptersList from "@/components/chapters/ChaptersList";
import { subjectsData } from "@/lib/data";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SubjectDashboard() {
  const [activeSubject, setActiveSubject] = useState("physics");

  const subjectIcons = {
    physics: "🟠",
    chemistry: "🟢",
    mathematics: "🔵",
  };

  const subjectShort = {
    physics: "Phy",
    chemistry: "Chem",
    mathematics: "Math",
  };

  const subjects = ["physics", "chemistry", "mathematics"];

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background flex flex-col md:grid md:grid-cols-[280px,1fr]">
        {/* Sidebar for Desktop */}
        <div className="hidden md:flex flex-col border-r p-4 gap-4">
          <div className="flex justify-center">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">JEE Main</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            2025 - 2009 | 173 Papers | 15825 Qs
          </div>

          <div className="space-y-1">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setActiveSubject(subject)}
                className={`flex items-center justify-between w-full p-3 rounded-lg text-left transition-colors ${
                  activeSubject === subject
                    ? "bg-secondary"
                    : "hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {subjectIcons[subject as keyof typeof subjectIcons]}
                  </span>
                  <span>
                    {subject.charAt(0).toUpperCase() + subject.slice(1)} PYQs
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Topbar for Mobile */}
        <div className="md:hidden border-b">
          {/* Top Row */}
          <div className="flex items-center justify-between p-4">
            <ThemeToggle />
            <h1 className="text-lg font-bold text-center flex-1">JEE Main</h1>
            <div className="w-8" /> {/* empty space to balance ThemeToggle width */}
          </div>

          {/* Subject Tabs */}
          <div className="flex border-t border-b">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setActiveSubject(subject)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 px-2 py-2 border-r last:border-none text-sm transition-colors ${
                  activeSubject === subject
                    ? "bg-secondary"
                    : "hover:bg-secondary/50"
                }`}
              >
                <span className="text-xl">
                  {subjectIcons[subject as keyof typeof subjectIcons]}
                </span>
                <span>{subjectShort[subject as keyof typeof subjectShort]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-6 flex-1">
          {/* Subject Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <span className="text-lg">
                {subjectIcons[activeSubject as keyof typeof subjectIcons]}
              </span>
              {activeSubject.charAt(0).toUpperCase() + activeSubject.slice(1)} PYQs
            </h2>
            <div className="text-muted-foreground text-sm">
              {subjectsData[activeSubject].description}
            </div>
          </div>

          <ChaptersList subject={activeSubject} />
        </div>
      </div>
    </ThemeProvider>
  );
}
