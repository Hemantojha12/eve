import { Link } from "wouter";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { type Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
  variant?: "vertical" | "horizontal";
}

export function EventCard({ event, variant = "vertical" }: EventCardProps) {
  const eventDate = new Date(event.date);

  if (variant === "horizontal") {
    return (
      <Link href={`/event/${event.id}`} className="group block">
        <div className="flex gap-4 p-3 rounded-2xl bg-card hover:bg-muted/30 transition-colors border border-border/40 shadow-sm hover:shadow-md">
          <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          </div>
          
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1">
              {format(eventDate, "EEE, MMM d • h:mm a")}
            </span>
            <h3 className="text-base font-bold text-foreground leading-tight truncate font-display">
              {event.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-xs mt-2">
              <MapPin size={12} className="mr-1" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="mt-2 font-semibold text-sm">
              ${(event.price / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/event/${event.id}`} className="group block relative">
      <div className="bg-card rounded-3xl overflow-hidden shadow-lg shadow-black/5 border border-border/50 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            <span className="text-xs font-bold text-foreground">
              ${(event.price / 100).toFixed(0)}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground leading-tight font-display mb-2 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm mb-3">
                <MapPin size={14} className="mr-1.5 text-primary" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center bg-secondary/50 rounded-xl px-2.5 py-2 min-w-[3.5rem] border border-secondary">
              <span className="text-xs font-bold text-primary uppercase">
                {format(eventDate, "MMM")}
              </span>
              <span className="text-lg font-black text-foreground font-display">
                {format(eventDate, "d")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
