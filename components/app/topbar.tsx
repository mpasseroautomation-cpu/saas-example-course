"use client";

import { Bell, Search, LogOut, User, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSettingsStore } from '@/lib/store/settings';
import { ClientOnly } from '@/components/client-only';
import Link from 'next/link';

export function Topbar() {
  const { profile } = useSettingsStore();
  const router = useRouter();

  const handleSearch = () => toast.info('Search is not implemented in v1');
  const handleNotifications = () => toast.info('No new notifications');

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <button onClick={handleSearch} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
          <Search className="h-5 w-5" />
        </button>
        <button onClick={handleNotifications} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
        </button>
        
        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
          <ClientOnly fallback={<div className="w-8 h-8 rounded-full bg-muted animate-pulse" />}>
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-sm font-medium leading-none">{profile.fullName}</span>
                <span className="text-xs text-muted-foreground mt-1">{profile.company}</span>
              </div>
              <Link href="/settings/profile" className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar className="h-9 w-9 border border-border hover:opacity-80 transition-opacity">
                  <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {profile.fullName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </ClientOnly>
        </div>
      </div>
    </header>
  );
}
