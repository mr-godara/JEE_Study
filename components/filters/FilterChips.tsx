import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FilterChipsProps {
  classes: string[];
  units: string[];
  onRemoveClass: (cls: string) => void;
  onRemoveUnit: (unit: string) => void;
  onClearAll: () => void;
}

export default function FilterChips({
  classes,
  units,
  onRemoveClass,
  onRemoveUnit,
  onClearAll,
}: FilterChipsProps) {
  if (classes.length === 0 && units.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {classes.map((cls) => (
        <Badge key={`class-${cls}`} variant="outline" className="flex items-center gap-1 px-2 py-1">
          Class: {cls}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveClass(cls)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      ))}
      
      {units.map((unit) => (
        <Badge key={`unit-${unit}`} variant="outline" className="flex items-center gap-1 px-2 py-1">
          Unit: {unit}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 ml-1"
            onClick={() => onRemoveUnit(unit)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </Button>
        </Badge>
      ))}
      
      {(classes.length > 0 || units.length > 0) && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs ml-2"
          onClick={onClearAll}
        >
          Clear all
        </Button>
      )}
    </div>
  );
}