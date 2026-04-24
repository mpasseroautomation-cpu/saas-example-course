import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, description, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden border-border/50 bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer", className)}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {icon && (
              <div className="p-1.5 rounded-md bg-muted text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {icon}
              </div>
            )}
            <h3 className="tracking-tight text-sm font-bold text-foreground">{title}</h3>
          </div>
          {trend && (
            <div className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold",
              trend.isPositive ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
            )}>
              {trend.value}%
              {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            </div>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-extrabold tracking-tight">{value}</div>
            <span className="text-xs font-semibold text-muted-foreground">{description || "Orders"}</span>
          </div>
          <div className="px-2 py-1 bg-muted/50 rounded text-[10px] font-bold text-muted-foreground group-hover:bg-primary/5 transition-colors">
            30D
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
