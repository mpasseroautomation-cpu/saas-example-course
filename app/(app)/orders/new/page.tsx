"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/app/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { orderFormSchema, OrderFormValues } from '@/lib/validators/order';
import { createOrder } from '@/app/actions/orders';

export default function NewOrderPage() {
  const router = useRouter();
  
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting, isValid } } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema as any),
    mode: 'onChange',
  });

  const onSubmit = async (data: OrderFormValues) => {
    try {
      const newOrderId = await createOrder({
        title: data.title,
        contentType: data.contentType,
        wordCount: data.wordCount,
        dueDate: data.dueDate,
      });
      
      toast.success('Order created successfully!');
      router.push(`/orders/${newOrderId}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create order');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="New Order" description="Create a new content order." />

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Content Title</Label>
              <Input id="title" placeholder="e.g. 10 Ways to Secure Your SaaS Platform" {...register('title')} />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type</Label>
                <Select onValueChange={(val: any) => setValue('contentType', val, { shouldValidate: true })}>
                  <SelectTrigger id="contentType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="seo_article">SEO Article</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="landing_page">Landing Page</SelectItem>
                  </SelectContent>
                </Select>
                {errors.contentType && <p className="text-sm text-destructive">{errors.contentType.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="wordCount">Word Count</Label>
                <Input id="wordCount" type="number" placeholder="e.g. 1000" {...register('wordCount', { valueAsNumber: true })} />
                {errors.wordCount && <p className="text-sm text-destructive">{errors.wordCount.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" {...register('dueDate')} />
              {errors.dueDate && <p className="text-sm text-destructive">{errors.dueDate.message}</p>}
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Order'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
