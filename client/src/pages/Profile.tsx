import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { LogOut, Settings, CreditCard, Bell, ChevronRight, User } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="h-full flex flex-col items-center justify-center p-6 text-center pt-20">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <User size={40} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold font-display mb-4">Guest User</h2>
          <p className="text-muted-foreground mb-8">
            Sign in to manage your profile and settings.
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

  const menuItems = [
    { icon: User, label: "Edit Profile", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
    { icon: CreditCard, label: "Payment Methods", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  return (
    <Layout className="bg-secondary/30">
      <div className="p-6">
        <h1 className="text-2xl font-bold font-display mb-8">Profile</h1>

        {/* Profile Card */}
        <div className="bg-background p-6 rounded-3xl shadow-sm border border-border/50 mb-8 flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold">
            {user.firstName?.[0] || user.username[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold font-display mb-1">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-muted-foreground text-sm">{user.username}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-background rounded-3xl shadow-sm border border-border/50 overflow-hidden mb-8">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center justify-between p-5 hover:bg-secondary/50 transition-colors ${i !== menuItems.length - 1 ? 'border-b border-border/40' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary">
                  <item.icon size={20} />
                </div>
                <span className="font-semibold">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <button
          onClick={() => logout()}
          className="w-full p-5 rounded-3xl bg-white border border-destructive/20 text-destructive font-bold flex items-center justify-center gap-2 hover:bg-destructive/5 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </Layout>
  );
}
