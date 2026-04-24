"use client";

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how ContentFlow looks on your device.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <Label>Theme</Label>
          <div className="flex items-center gap-4">
            {mounted ? (
              <>
                <Button 
                  variant={theme === 'light' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                  onClick={() => setTheme('light')}
                >
                  Light
                </Button>
                <Button 
                  variant={theme === 'dark' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </Button>
                <Button 
                  variant={theme === 'system' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                  onClick={() => setTheme('system')}
                >
                  System
                </Button>
              </>
            ) : (
              <div className="w-full h-10 border rounded-md" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
