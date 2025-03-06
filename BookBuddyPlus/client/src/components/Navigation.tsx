import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Heart } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navigation() {
  const [location] = useLocation();
  const t = useTranslation();

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex gap-4">
            <Link href="/">
              <Button variant={location === "/" ? "default" : "ghost"} className="gap-2">
                <Home size={20} />
                {t.navigation.home}
              </Button>
            </Link>
            <Link href="/favorites">
              <Button variant={location === "/favorites" ? "default" : "ghost"} className="gap-2">
                <Heart size={20} />
                {t.navigation.favorites}
              </Button>
            </Link>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}