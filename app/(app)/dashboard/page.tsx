import Link from 'next/link';
import { Plus, CheckCircle2, Clock, FileText, Bell, MoreVertical, Calendar, Download, TrendingUp, Tags, Users, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/app/stat-card';
import { getOrders } from '@/app/actions/orders';
import { Card } from '@/components/ui/card';

export default async function DashboardPage() {
  const orders = await getOrders();
  const recentOrders = orders.slice(0, 5);

  const activeOrders = orders.filter(o => !['delivered', 'approved'].includes(o.status)).length;
  const inReview = orders.filter(o => o.status === 'in_review').length;
  const currentMonth = new Date().getMonth();
  const deliveredThisMonth = orders.filter(o => 
    o.status === 'delivered' && new Date(o.createdAt).getMonth() === currentMonth
  ).length;
  const totalWords = orders.reduce((sum, order) => sum + order.wordCount, 0);

  return (
    <div className="p-2 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header to match DashMark */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
      </div>

      {/* Big Charts Row */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Fake Bar Chart */}
        <Card className="p-6 border-border/50 shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold">Content Volume</h3>
            <div className="flex gap-2 text-muted-foreground">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"><MoreVertical className="h-4 w-4" /></Button>
            </div>
          </div>
          
          <div className="h-40 flex items-end justify-between gap-1 sm:gap-2 mb-4 px-2">
            {[40, 70, 45, 90, 65, 30, 80, 100, 50, 70, 40, 85].map((h, i) => (
              <div key={i} className="w-full relative group/bar h-full flex flex-col justify-end">
                <div 
                  className={`w-full rounded-t-sm transition-all duration-700 ease-in-out bg-gradient-to-t ${i === 7 ? 'from-primary/80 to-primary' : 'from-primary/20 to-primary/40 hover:from-primary/40 hover:to-primary/60'}`}
                  style={{ height: `${h}%` }}
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity z-10">
                  {h}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground font-medium px-2 mb-6">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground font-medium">Total Words Written</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold">{totalWords.toLocaleString()}</span>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                45% <TrendingUp className="h-3 w-3" />
              </span>
            </div>
          </div>
        </Card>

        {/* Fake Line Chart / Stats */}
        <Card className="p-6 border-border/50 shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold">Order Activity</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"><Calendar className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"><Download className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* SVG Line Chart Representation */}
          <div className="h-40 relative w-full mb-4">
             <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
               <path d="M0,50 C20,50 20,20 40,20 C60,20 60,80 80,80 C90,80 90,40 100,40" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M0,70 C15,70 15,90 30,90 C50,90 50,50 70,50 C85,50 85,60 100,60" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground font-medium px-2 mb-6">
            <span>Sep 12</span><span>Sep 14</span><span>Sep 16</span><span>Sep 18</span>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground font-medium">Total Orders</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold">{orders.length || 124}</span>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  12% <TrendingUp className="h-3 w-3" />
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground font-medium">Target Orders</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold">500</span>
                <span className="text-[10px] font-bold text-green-600 bg-green-500/10 px-2 py-0.5 rounded">
                  23% completed
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 4 Small Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Active Orders"
          value={activeOrders}
          description="Orders"
          icon={<FileText className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="In Review"
          value={inReview}
          description="Orders"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          title="Delivered"
          value={deliveredThisMonth}
          description="This month"
          icon={<CheckCircle2 className="h-4 w-4" />}
          trend={{ value: 4, isPositive: true }}
        />
        <StatCard
          title="Total Words"
          value={totalWords.toLocaleString()}
          description="Written"
          icon={<FileText className="h-4 w-4" />}
        />
      </div>

      {/* Bottom Section - Tasks / Calendar Layout */}
      <Card className="p-6 border-border/50 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-6 border-b w-full sm:w-auto overflow-x-auto pb-1">
            <button className="pb-2 text-sm font-bold border-b-2 border-primary text-foreground whitespace-nowrap">Recent Orders</button>
          </div>
          
          <div className="flex items-center gap-3">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 rounded-lg px-6">
              <Link href="/orders/new">Create</Link>
            </Button>
          </div>
        </div>

        {/* Fake Calendar View */}
        <div className="space-y-4">
           {recentOrders.length === 0 ? (
             <p className="text-sm text-muted-foreground">No recent orders found.</p>
           ) : (
             <div className="space-y-3">
               {recentOrders.map((order, i) => {
                 const colors = [
                   "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
                   "bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/20 dark:text-orange-400",
                   "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20 dark:text-blue-400",
                   "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20 dark:text-green-400"
                 ];
                 const colorClass = colors[i % colors.length];

                 return (
                   <Link key={order.id} href={`/orders/${order.id}`}>
                     <div className="flex items-center gap-4 group cursor-pointer mb-3">
                       <div className="w-16 text-xs text-muted-foreground font-medium text-right group-hover:text-foreground transition-colors">
                         {9 + i} AM
                       </div>
                       <div className={`flex-1 p-3 rounded-xl border ${colorClass} transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-md`}>
                         <h4 className="font-bold text-sm">{order.title}</h4>
                         <p className="text-xs opacity-80 mt-1 font-medium">{order.contentType.replace('_', ' ')} • {order.wordCount} words</p>
                       </div>
                     </div>
                   </Link>
                 )
               })}
             </div>
           )}
        </div>
      </Card>
    </div>
  );
}
