import { useBookings } from "@/hooks/use-bookings";
import { Layout } from "@/components/Layout";
import { format } from "date-fns";
import { MapPin, Calendar, QrCode } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function Bookings() {
  const { data: bookings, isLoading } = useBookings();
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="h-full flex flex-col items-center justify-center p-6 text-center pt-20">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <QrCode size={40} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold font-display mb-4">Sign in to view tickets</h2>
          <p className="text-muted-foreground mb-8">
            Login to access your booked events and tickets.
          </p>
          <Link href="/auth">
            <button className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full max-w-xs">
              Login Now
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="bg-secondary/30">
      <div className="p-6">
        <h1 className="text-2xl font-bold font-display mb-6">My Tickets</h1>

        <div className="space-y-6">
          {isLoading ? (
            <div className="bg-background rounded-3xl p-6 shadow-sm border border-border/50">
              <Skeleton className="h-8 w-2/3 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-8" />
              <Skeleton className="h-48 w-full rounded-2xl" />
            </div>
          ) : bookings?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-background rounded-3xl border border-dashed border-border p-8">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Calendar size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">No tickets yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't booked any events yet. Explore upcoming events to get started.
              </p>
              <Link href="/search">
                <button className="px-6 py-3 bg-white border border-border shadow-sm rounded-xl font-semibold text-foreground hover:bg-secondary transition-colors">
                  Explore Events
                </button>
              </Link>
            </div>
          ) : (
            bookings?.map((booking) => (
              <div key={booking.id} className="bg-background rounded-3xl overflow-hidden shadow-sm border border-border/50 relative group">
                {/* Event Image Top */}
                <div className="h-32 w-full relative">
                  <img 
                    src={booking.event.imageUrl} 
                    alt={booking.event.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-xl font-bold font-display leading-tight">
                      {booking.event.title}
                    </h3>
                  </div>
                </div>

                {/* Ticket Body */}
                <div className="px-6 pb-6 pt-2">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar size={16} className="mr-2 text-primary" />
                        <span>{format(new Date(booking.event.date), "EEE, MMM d • h:mm a")}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin size={16} className="mr-2 text-primary" />
                        <span className="truncate max-w-[180px]">{booking.event.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dashed Separator */}
                  <div className="relative h-1 my-6 border-t-2 border-dashed border-border/60">
                    <div className="absolute -left-8 -top-3 w-6 h-6 rounded-full bg-secondary/30" />
                    <div className="absolute -right-8 -top-3 w-6 h-6 rounded-full bg-secondary/30" />
                  </div>

                  {/* QR Section */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Ticket ID</p>
                      <p className="font-mono text-sm font-bold tracking-widest text-foreground">
                        #{booking.id.toString().padStart(6, '0')}
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-foreground text-background rounded-xl flex items-center justify-center">
                      <QrCode size={32} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
