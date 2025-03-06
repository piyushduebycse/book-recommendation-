import { categories } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  selectedCategory?: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap mb-8">
      <div className="flex space-x-2 p-1">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          onClick={() => onSelectCategory("")}
          className="shrink-0"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => onSelectCategory(category)}
            className="shrink-0"
          >
            {category}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
