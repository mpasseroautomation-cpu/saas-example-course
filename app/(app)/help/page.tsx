"use client";

import { LifeBuoy, Mail, MessageSquare } from 'lucide-react';
import { PageHeader } from '@/components/app/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader 
        title="Help & Support" 
        description="Need assistance with your orders or account? We're here to help."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Live Chat
            </CardTitle>
            <CardDescription>
              Chat with our support team in real-time. Available Mon-Fri, 9am-5pm EST.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email Support
            </CardTitle>
            <CardDescription>
              Send us an email and we'll get back to you within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = 'mailto:support@contentflow.com'}>
              support@contentflow.com
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LifeBuoy className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Quick answers to common questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm">How long does an order take?</h4>
              <p className="text-sm text-muted-foreground mt-1">Standard turnaround time is 3-5 business days depending on the content type and word count.</p>
            </div>
            <div>
              <h4 className="font-medium text-sm">Can I request revisions?</h4>
              <p className="text-sm text-muted-foreground mt-1">Yes! All orders include up to 2 rounds of revisions free of charge.</p>
            </div>
            <div>
              <h4 className="font-medium text-sm">How do I change my billing information?</h4>
              <p className="text-sm text-muted-foreground mt-1">Billing integration is coming in Phase 3. Please contact support for now.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
