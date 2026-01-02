import { ReactNode } from "react";
import { useLocation, Link } from "wouter";
import { BottomNav } from "./BottomNav";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { User } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
  className?: string;
}

export function Layout({ children, showNav = true, className }: LayoutProps) {
  const [location] = useLocation();
  const { user } = useAuth();
  
  // Don't show nav on auth pages or event details
  const shouldHideNav = !showNav || location === "/auth";
  const isEventDetails = location.startsWith("/event/");

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-border/40">
      <header className="flex items-center justify-between p-4 bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border/40">
        <Link href="/">
          <a className="text-xl font-bold tracking-tighter text-primary hover:opacity-80 transition-opacity">
            e-ventA
          </a>
        </Link>
        <Link href="/profile">
          <a className="hover-elevate active-elevate-2 transition-transform">
            <Avatar className="h-8 w-8 border border-border/50">
              <AvatarImage src={user?.profileImageUrl || undefined} />
              <AvatarFallback>
                <User className="h-4 w-4 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </a>
        </Link>
      </header>

      <main className={clsx("flex-1 overflow-y-auto no-scrollbar", className, !shouldHideNav && "pb-24")}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
      
      {!shouldHideNav && <BottomNav />}
    </div>
  );
}
