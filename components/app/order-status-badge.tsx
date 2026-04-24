import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  submitted: { label: 'Submitted', className: 'bg-muted text-muted-foreground hover:bg-muted/80' },
  in_progress: { label: 'In Progress', className: 'bg-chart-4/10 text-chart-4 hover:bg-chart-4/20 border-chart-4/20' },
  in_review: { label: 'In Review', className: 'bg-chart-2/10 text-chart-2 hover:bg-chart-2/20 border-chart-2/20' },
  delivered: { label: 'Delivered', className: 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20' },
  approved: { label: 'Approved', className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status];
  
  return (
    <Badge variant="outline" className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  );
}
