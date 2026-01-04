import { useEvents } from "@/hooks/use-events";
import { Layout } from "@/components/Layout";
import { EventCard } from "@/components/EventCard";
import { Bell, Search } from "lucide-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useState, useMemo } from "react";
import { clsx } from "clsx";

const CATEGORIES = ["All", "Music", "Art", "Food", "Tech", "Sports", "Business"];

export default function Home() {
  const { data: events, isLoading } = useEvents();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    if (!events) return [];
    if (selectedCategory === "All") return events;
    return events.filter(event => event.category === selectedCategory);
  }, [events, selectedCategory]);

  return (
    <Layout className="bg-secondary/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md px-6 py-4 border-b border-border/40 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-0.5">Welcome back,</p>
          <h1 className="text-xl font-bold text-foreground font-display">
            {user?.firstName || "Guest User"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/search">
            <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
          </Link>
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-3 w-2 h-2 bg-accent rounded-full border border-white" />
          </button>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Categories Section (Moved below header/hero area) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-display">Categories</h2>
            <button className="text-xs font-semibold text-primary hover:underline">See All</button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={clsx(
                  "px-5 py-2.5 rounded-full border shadow-sm text-sm font-semibold whitespace-nowrap transition-all duration-300",
                  selectedCategory === cat 
                    ? "bg-primary text-white border-primary" 
                    : "bg-white border-border/50 text-foreground hover:bg-primary/10 hover:border-primary/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-display">
              {selectedCategory === "All" ? "Upcoming Events" : `${selectedCategory} Events`}
            </h2>
            <Link href="/search" className="text-xs font-semibold text-primary hover:underline">
              See All
            </Link>
          </div>
          
          <div className="grid gap-6">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-3xl p-4 space-y-3">
                  <Skeleton className="h-48 w-full rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-10 bg-card rounded-3xl border border-dashed border-border">
                <p className="text-muted-foreground">No {selectedCategory.toLowerCase()} events found.</p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
