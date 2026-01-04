import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  price: number;
  totalSeats: number;
  organizerId?: string | null;
}

const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: "Tech Conference 2024",
    description: "The biggest tech conference of the year featuring top speakers.",
    date: "2024-09-15T09:00:00.000Z",
    location: "Convention Center, San Francisco",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    price: 29900,
    totalSeats: 500,
  },
  {
    id: 2,
    title: "Music Festival",
    description: "A weekend of music, food, and fun.",
    date: "2024-10-05T12:00:00.000Z",
    location: "Central Park, New York",
    imageUrl: "https://images.unsplash.com/photo-1459749411177-287ce371c015",
    price: 15000,
    totalSeats: 1000,
  },
  {
    id: 3,
    title: "Art Gallery Opening",
    description: "Exclusive opening of the new modern art exhibit.",
    date: "2024-11-20T18:30:00.000Z",
    location: "Modern Art Museum, Chicago",
    imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3969105",
    price: 0,
    totalSeats: 100,
  },
];

export function useEvents() {
  return useQuery({
    queryKey: ["/api/events"],
    queryFn: async () => MOCK_EVENTS,
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: ["/api/events", id],
    queryFn: async () => MOCK_EVENTS.find(e => e.id === id) || null,
    enabled: !isNaN(id),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      return { ...data, id: Math.random() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({
        title: "Event Created (Mock)",
        description: "In a real app, this would be sent to your external backend.",
      });
    },
  });
}
