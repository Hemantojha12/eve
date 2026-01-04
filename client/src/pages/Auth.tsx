import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Calendar } from "lucide-react";

export default function Auth() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  const handleLogin = () => {
    // Mock login for frontend-only mode
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[50%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] bg-accent/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-primary to-accent rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30 mb-8 rotate-3">
          <Calendar size={48} className="text-white" />
        </div>

        <h1 className="text-4xl font-extrabold font-display mb-3 tracking-tight">
          e-vent<span className="text-primary">A</span>
        </h1>
        
        <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
          Discover and book the best events happening in your city.
        </p>

        <button
          onClick={handleLogin}
          className="w-full py-4 px-6 bg-foreground text-background font-bold rounded-2xl text-lg shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3"
        >
          <span>Get Started</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
        
        <p className="mt-8 text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
