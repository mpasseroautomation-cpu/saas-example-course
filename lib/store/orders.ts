import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderEvent, OrderStatus, MOCK_ORDERS, MOCK_EVENTS, ContentType } from '@/lib/mock-data';

interface OrdersState {
  orders: Order[];
  events: Record<string, OrderEvent[]>;
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (id: string, toStatus: OrderStatus, note?: string) => void;
  getOrder: (id: string) => Order | undefined;
  getOrderEvents: (id: string) => OrderEvent[];
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: MOCK_ORDERS,
      events: MOCK_EVENTS,
      
      createOrder: (orderData) => {
        const id = `ord-${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();
        const newOrder: Order = {
          ...orderData,
          id,
          status: 'submitted',
          createdAt: now,
        };
        
        const newEvent: OrderEvent = {
          id: `evt-${Math.random().toString(36).substr(2, 9)}`,
          orderId: id,
          toStatus: 'submitted',
          createdAt: now,
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          events: {
            ...state.events,
            [id]: [newEvent],
          },
        }));

        return newOrder;
      },
      
      updateOrderStatus: (id, toStatus, note) => {
        const now = new Date().toISOString();
        
        set((state) => {
          const order = state.orders.find(o => o.id === id);
          if (!order) return state;

          const updatedOrders = state.orders.map(o => 
            o.id === id ? { ...o, status: toStatus } : o
          );

          const newEvent: OrderEvent = {
            id: `evt-${Math.random().toString(36).substr(2, 9)}`,
            orderId: id,
            fromStatus: order.status,
            toStatus,
            note,
            createdAt: now,
          };

          return {
            orders: updatedOrders,
            events: {
              ...state.events,
              [id]: [...(state.events[id] || []), newEvent],
            },
          };
        });
      },

      getOrder: (id) => get().orders.find((o) => o.id === id),
      getOrderEvents: (id) => get().events[id] || [],
    }),
    {
      name: 'contentflow-orders',
    }
  )
);
