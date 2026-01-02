import { useEvent } from "@/hooks/use-events";
import { useCreateBooking } from "@/hooks/use-bookings";
import { Layout } from "@/components/Layout";
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Heart, User } from "lucide-react";
import { useRoute, useLocation } from "wouter";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { clsx } from "clsx";

export default function EventDetails() {
  const [, params] = useRoute("/event/:id");
  const [, setLocation] = useLocation();
  const eventId = params ? parseInt(params.id) : 0;
  
  const { data: event, isLoading } = useEvent(eventId);
  const { mutate: bookEvent, isPending: isBooking } = useCreateBooking();
  const { user } = useAuth();

  const handleBook = () => {
    if (!user) {
      setLocation("/auth");
      return;
    }
    
    if (event) {
      bookEvent({ 
        eventId: event.id,
        userId: parseInt(user.id as unknown as string) // Adjust based on user ID type
      });
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <Layout showNav={false}>
        <div className="relative h-[40vh]">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="p-6 space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </Layout>
    );
  }

  if (!event) return null;

  const eventDate = new Date(event.date);

  return (
    <Layout showNav={false} className="pb-0">
      {/* Hero Image Area */}
      <div className="relative h-[45vh] w-full">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        {/* Top Actions */}
        <div className="absolute top-0 left-0 right-0 p-6 pt-safe flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
              <Heart size={20} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Sheet */}
      <div className="relative -mt-12 bg-background rounded-t-[2.5rem] p-8 min-h-[60vh] pb-32 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="w-12 h-1.5 bg-border/60 rounded-full mx-auto mb-8" />
        
        <h1 className="text-3xl font-bold font-display leading-tight mb-6">
          {event.title}
        </h1>

        <div className="space-y-6">
          {/* Info Rows */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Calendar size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-0.5">{format(eventDate, "MMMM d, yyyy")}</h4>
              <p className="text-muted-foreground text-sm">{format(eventDate, "EEEE, h:mm a")}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-0.5">Location</h4>
              <p className="text-muted-foreground text-sm">{event.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-4 border-y border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <User size={20} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Organizer</p>
                <p className="font-semibold">Event Organizer</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold font-display mb-3">About Event</h3>
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 pb-safe bg-background/80 backdrop-blur-xl border-t border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-medium uppercase">Total Price</span>
            <span className="text-2xl font-bold font-display text-primary">
              ${(event.price / 100).toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={handleBook}
            disabled={isBooking}
            className={clsx(
              "flex-1 h-14 rounded-2xl font-bold text-lg shadow-lg shadow-primary/25 transition-all duration-300",
              isBooking 
                ? "bg-muted text-muted-foreground cursor-not-allowed" 
                : "bg-primary text-white hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            )}
          >
            {isBooking ? "Booking..." : "Book Ticket"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
