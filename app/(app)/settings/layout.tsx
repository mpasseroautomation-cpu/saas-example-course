import { ReactNode } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/app/page-header';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <PageHeader title="Settings" description="Manage your account settings and preferences." />
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col gap-1">
            <Link href="/settings/profile" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground">Profile</Link>
            <Link href="/settings/appearance" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground">Appearance</Link>
            <Link href="/settings/notifications" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground">Notifications</Link>
            <Link href="/settings/security" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground">Security</Link>
          </nav>
        </aside>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
