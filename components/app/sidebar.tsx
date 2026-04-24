"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, HelpCircle, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettingsStore } from '@/lib/store/settings';
import { ClientOnly } from '@/components/client-only';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/orders', label: 'Orders', icon: FileText },
  { href: '/settings/profile', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useSettingsStore();

  return (
    <div className="flex flex-col w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-full p-4 relative overflow-y-auto">
      <div className="flex items-center gap-2 px-2 mb-6 mt-2 text-primary">
        <div className="bg-primary text-white p-1.5 rounded-lg shadow-md shadow-primary/20">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <span className="font-bold text-xl tracking-tight text-foreground">DashMark</span>
      </div>

      <nav className="flex-1 space-y-6">
        <div>
          <h4 className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">Main</h4>
          <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm shadow-primary/5" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground hover:translate-x-1"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 h-5 bg-primary rounded-r-full" />
                )}
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isActive ? "text-primary scale-110" : "text-sidebar-foreground/50 group-hover:text-primary/70"
                )} />
                {item.label}
              </Link>
            );
          })}
          </div>
        </div>
      </nav>

      <div className="mt-auto pt-4 border-t border-sidebar-border">
        <Link
          href="/settings/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200 group"
        >
          <div className="flex-1 flex items-center gap-3">
            <ClientOnly fallback={<div className="h-8 w-8 rounded-full bg-muted animate-pulse" />}>
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-sm overflow-hidden">
                {profile?.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.fullName} className="h-full w-full object-cover" />
                ) : (
                  profile?.fullName?.substring(0, 2).toUpperCase() || 'U'
                )}
              </div>
            </ClientOnly>
            <div className="flex flex-col">
              <ClientOnly fallback={<span className="text-foreground font-semibold text-sm">Loading...</span>}>
                <span className="text-foreground font-semibold text-sm truncate w-28">{profile?.fullName || 'User'}</span>
              </ClientOnly>
              <ClientOnly fallback={<span className="text-[10px] text-muted-foreground">loading</span>}>
                <span className="text-[10px] text-muted-foreground truncate w-28">{profile?.company || 'Company'}</span>
              </ClientOnly>
            </div>
          </div>
          <Settings className="h-4 w-4 text-sidebar-foreground/40 group-hover:text-primary" />
        </Link>
      </div>
    </div>
  );
}
