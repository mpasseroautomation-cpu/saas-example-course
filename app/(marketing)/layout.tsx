import { ReactNode } from 'react';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="h-16 border-b border-border flex items-center px-6 lg:px-12">
        <div className="font-semibold text-lg text-primary tracking-tight">ContentFlow</div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
