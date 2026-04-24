import { OrderEvent } from '@/lib/mock-data';
import { CheckCircle2, Clock, FileText, Upload } from 'lucide-react';

const statusIconMap = {
  submitted: FileText,
  in_progress: Clock,
  in_review: Upload,
  delivered: CheckCircle2,
  approved: CheckCircle2,
};

export function OrderTimeline({ events }: { events: OrderEvent[] }) {
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      {sortedEvents.map((event, index) => {
        const Icon = statusIconMap[event.toStatus] || Clock;
        const isLast = index === sortedEvents.length - 1;
        const date = new Date(event.createdAt);

        return (
          <div key={event.id} className="relative flex gap-4">
            {!isLast && (
              <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-border" />
            )}
            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted ring-4 ring-background">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col pb-2">
              <span className="text-sm font-medium capitalize">
                Status updated to {event.toStatus.replace('_', ' ')}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">
                {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              {event.note && (
                <div className="mt-2 rounded-md bg-muted p-3 text-sm text-foreground">
                  {event.note}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
