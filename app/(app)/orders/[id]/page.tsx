import { use } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/app/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getOrder, getOrderEvents } from '@/app/actions/orders';
import { OrderStatusBadge } from '@/components/app/order-status-badge';
import { OrderTimeline } from '@/components/app/order-timeline';
import { EmptyState } from '@/components/app/empty-state';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  const events = await getOrderEvents(id);

  if (!order) {
    return (
      <EmptyState 
        title="Order not found" 
        description="The order you are looking for does not exist or has been removed."
      />
    );
  }

  return (
    <div>
      <PageHeader title={order.title} description={`Created ${new Date(order.createdAt).toLocaleDateString()}`}>
        {order.deliverablePath && (
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Deliverable
          </Button>
        )}
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="mt-1"><OrderStatusBadge status={order.status} /></div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="mt-1 font-medium capitalize">{order.contentType.replace('_', ' ')}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Word Count</div>
                <div className="mt-1 font-medium">{order.wordCount} words</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Due Date</div>
                <div className="mt-1 font-medium">{new Date(order.dueDate).toLocaleDateString()}</div>
              </div>
            </CardContent>
          </Card>

          {order.deliverablePath && (
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-primary">Deliverable Ready</h3>
                  <p className="text-sm text-muted-foreground">Your content is ready for review.</p>
                </div>
                <Button variant="default">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline events={events} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
