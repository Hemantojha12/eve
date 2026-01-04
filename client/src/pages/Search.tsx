import { useState } from "react";
import { useEvents } from "@/hooks/use-events";
import { Layout } from "@/components/Layout";
import { EventCard } from "@/components/EventCard";
import { Search as SearchIcon, SlidersHorizontal, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Search() {
  const { data: events, isLoading } = useEvents();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredEvents = events?.filter(event => {
    const matchesQuery = event.title.toLowerCase().includes(query.toLowerCase()) || 
                         event.location.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || event.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <Layout>
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-bold font-display mb-6">Explore Events</h1>
        
        {/* Search Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
            <SearchIcon size={20} />
          </div>
          <input
            type="text"
            placeholder="Search events, locations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-card border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-foreground placeholder:text-muted-foreground shadow-sm"
          />
          <button className="absolute inset-y-0 right-3 flex items-center px-3 text-muted-foreground hover:text-primary transition-colors">
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6 mb-4">
          {["All", "Music", "Art", "Food", "Tech", "Sports"].map((cat) => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 border
                ${category === cat 
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/25" 
                  : "bg-white text-muted-foreground border-border/60 hover:border-border hover:bg-secondary/50"}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-6 pb-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground font-medium">
            {filteredEvents?.length || 0} events found
          </p>
          {query && (
            <div className="flex items-center text-primary font-medium">
              <MapPin size={14} className="mr-1" />
              <span>Near you</span>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 p-3 rounded-2xl bg-card border border-border/40">
                <Skeleton className="w-24 h-24 rounded-xl flex-shrink-0" />
                <div className="space-y-2 flex-1 py-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredEvents?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
              <SearchIcon size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold font-display mb-2">No events found</h3>
            <p className="text-muted-foreground max-w-[200px]">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents?.map((event) => (
              <EventCard key={event.id} event={event} variant="horizontal" />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
