"use client";

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSettingsStore } from '@/lib/store/settings';
import { ClientOnly } from '@/components/client-only';
import { signout } from '@/app/actions/auth';
import { LogOut } from 'lucide-react';

export default function ProfileSettingsPage() {
  const { profile, updateProfile } = useSettingsStore();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: profile.fullName,
      company: profile.company,
    }
  });

  const onSubmit = (data: any) => {
    updateProfile(data);
    toast.success('Profile updated successfully');
  };

  return (
    <ClientOnly fallback={<div className="h-32 flex items-center justify-center">Loading profile...</div>}>
      <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your personal information and how others see you.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatarUrl} />
              <AvatarFallback>{profile.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button variant="outline" type="button">Change Avatar</Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...register('fullName')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" {...register('company')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="john@acme.com" disabled />
              <p className="text-xs text-muted-foreground">Contact support to change your email address.</p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
        <div className="pt-6 mt-6 border-t">
          <form action={signout}>
            <Button type="submit" variant="destructive" className="w-full sm:w-auto">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out of your account
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
    </ClientOnly>
  );
}
