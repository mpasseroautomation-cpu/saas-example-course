"use client";

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSettingsStore } from '@/lib/store/settings';

export default function NotificationsSettingsPage() {
  const { notifications, updateNotifications } = useSettingsStore();

  const handleToggle = (key: keyof typeof notifications) => (checked: boolean) => {
    updateNotifications({ [key]: checked });
    toast.success('Notification preferences updated');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage how you receive updates about your orders.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Order Status Changes</Label>
              <p className="text-sm text-muted-foreground">Receive emails when your order moves to a new status.</p>
            </div>
            <Switch 
              checked={notifications.orderStatusChange} 
              onCheckedChange={handleToggle('orderStatusChange')} 
            />
          </div>
          
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Deliverable Ready</Label>
              <p className="text-sm text-muted-foreground">Receive an email immediately when your content is ready.</p>
            </div>
            <Switch 
              checked={notifications.deliverableReady} 
              onCheckedChange={handleToggle('deliverableReady')} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
