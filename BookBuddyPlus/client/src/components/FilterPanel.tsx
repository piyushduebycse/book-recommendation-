import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export interface FilterOptions {
  sortBy: string;
  language: string;
  yearRange: [number, number];
  isExpanded: boolean;
}

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const currentYear = new Date().getFullYear();
const YEAR_RANGE: [number, number] = [1800, currentYear];

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const t = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (updates: Partial<FilterOptions>) => {
    onFilterChange({ ...filters, ...updates });
  };

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="gap-2">
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
            {t.filters.advancedFilters}
          </Button>
        </CollapsibleTrigger>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => updateFilters({ sortBy: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t.filters.sortBy} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">{t.filters.sortOptions.relevance}</SelectItem>
            <SelectItem value="newest">{t.filters.sortOptions.newest}</SelectItem>
            <SelectItem value="title">{t.filters.sortOptions.title}</SelectItem>
            <SelectItem value="author">{t.filters.sortOptions.author}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CollapsibleContent className="space-y-4">
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>{t.filters.language}</Label>
            <Select
              value={filters.language}
              onValueChange={(value) => updateFilters({ language: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.filters.selectLanguage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t.filters.languages.english}</SelectItem>
                <SelectItem value="hi">{t.filters.languages.hindi}</SelectItem>
                <SelectItem value="all">{t.filters.languages.all}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t.filters.publicationYear}</Label>
            <div className="pt-2">
              <Slider
                min={YEAR_RANGE[0]}
                max={YEAR_RANGE[1]}
                step={1}
                value={filters.yearRange}
                onValueChange={(value) => updateFilters({ yearRange: value as [number, number] })}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{filters.yearRange[0]}</span>
                <span>{filters.yearRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
