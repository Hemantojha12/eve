import { ReactNode } from "react";
import { useLocation } from "wouter";
import { BottomNav } from "./BottomNav";
import { clsx } from "clsx";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
  className?: string;
}

export function Layout({ children, showNav = true, className }: LayoutProps) {
  const [location] = useLocation();
  
  // Don't show nav on auth pages or event details
  const shouldHideNav = !showNav || location.startsWith("/event/") || location === "/auth";

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-border/40">
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
