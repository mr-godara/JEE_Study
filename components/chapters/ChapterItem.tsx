import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Chapter } from "@/lib/types";
import { getChapterIcon } from "@/lib/utils";

interface ChapterItemProps {
  chapter: Chapter;
}

export default function ChapterItem({ chapter }: ChapterItemProps) {
  const Icon = getChapterIcon(chapter.id);
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-orange-500">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">{chapter.title}</h3>
              {chapter.isAnonymous && (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-800">
                  Anonymous
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm">
                <span>2025: {chapter.stats.y2025}Qs</span>
                {chapter.stats.trend === "up" ? (
                  <ChevronUp className="h-4 w-4 text-green-500" />
                ) : chapter.stats.trend === "down" ? (
                  <ChevronDown className="h-4 w-4 text-red-500" />
                ) : null}
              </div>
              <div className="text-sm text-muted-foreground">
                2024: {chapter.stats.y2024}Qs
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground border-l pl-4">
              {chapter.stats.total}/{chapter.stats.totalQuestions} Qs
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}