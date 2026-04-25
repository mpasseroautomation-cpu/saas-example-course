"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updatePassword } from '@/app/actions/auth';

export default function SecuritySettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (!currentPassword) {
      toast.error('Enter your current password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    const res = await updatePassword(currentPassword, newPassword);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage your password and account security.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" autoComplete="current-password" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" autoComplete="new-password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" autoComplete="new-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        </div>

        <div className="pt-4 border-t flex justify-start">
          <Button onClick={handleUpdatePassword} disabled={loading}>
            {loading ? 'Updating...' : 'Update password'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
