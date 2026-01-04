import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./use-auth";
import { type Event } from "./use-events";

export interface Booking {
  id: number;
  userId: string;
  eventId: number;
  bookingDate: string;
  status: string;
  event: Event;
}

export function useBookings() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["/api/bookings"],
    queryFn: async () => [] as Booking[],
    enabled: !!user,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      return { ...data, id: Math.random() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Confirmed! (Mock)",
        description: "In a real app, this would be saved to your external backend.",
      });
    },
  });
}
