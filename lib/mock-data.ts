export type ContentType = 'blog' | 'seo_article' | 'social' | 'email' | 'landing_page';
export type OrderStatus = 'submitted' | 'in_progress' | 'in_review' | 'delivered' | 'approved';

export interface Order {
  id: string;
  contentType: ContentType;
  title: string;
  wordCount: number;
  dueDate: string;
  status: OrderStatus;
  deliverablePath?: string;
  createdAt: string;
}

export interface OrderEvent {
  id: string;
  orderId: string;
  fromStatus?: OrderStatus;
  toStatus: OrderStatus;
  note?: string;
  createdAt: string;
}

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-123',
    contentType: 'blog',
    title: '10 Ways to Secure Your SaaS Platform',
    wordCount: 1200,
    dueDate: '2026-05-10',
    status: 'in_progress',
    createdAt: '2026-04-20T10:00:00Z',
  },
  {
    id: 'ord-124',
    contentType: 'landing_page',
    title: 'Homepage Copy Refresh',
    wordCount: 800,
    dueDate: '2026-04-28',
    status: 'in_review',
    createdAt: '2026-04-18T14:30:00Z',
  },
  {
    id: 'ord-125',
    contentType: 'email',
    title: 'Q2 Newsletter Sequence',
    wordCount: 1500,
    dueDate: '2026-04-25',
    status: 'delivered',
    deliverablePath: '/downloads/q2-newsletter.docx',
    createdAt: '2026-04-10T09:15:00Z',
  },
  {
    id: 'ord-126',
    contentType: 'social',
    title: 'LinkedIn Posts - May',
    wordCount: 400,
    dueDate: '2026-05-05',
    status: 'submitted',
    createdAt: '2026-04-24T08:00:00Z',
  },
];

export const MOCK_EVENTS: Record<string, OrderEvent[]> = {
  'ord-123': [
    { id: 'evt-1', orderId: 'ord-123', toStatus: 'submitted', createdAt: '2026-04-20T10:00:00Z' },
    { id: 'evt-2', orderId: 'ord-123', fromStatus: 'submitted', toStatus: 'in_progress', createdAt: '2026-04-21T09:00:00Z' },
  ],
  'ord-124': [
    { id: 'evt-3', orderId: 'ord-124', toStatus: 'submitted', createdAt: '2026-04-18T14:30:00Z' },
    { id: 'evt-4', orderId: 'ord-124', fromStatus: 'submitted', toStatus: 'in_progress', createdAt: '2026-04-19T10:00:00Z' },
    { id: 'evt-5', orderId: 'ord-124', fromStatus: 'in_progress', toStatus: 'in_review', note: 'Draft ready for review.', createdAt: '2026-04-22T15:00:00Z' },
  ],
  'ord-125': [
    { id: 'evt-6', orderId: 'ord-125', toStatus: 'submitted', createdAt: '2026-04-10T09:15:00Z' },
    { id: 'evt-7', orderId: 'ord-125', fromStatus: 'submitted', toStatus: 'in_progress', createdAt: '2026-04-11T09:00:00Z' },
    { id: 'evt-8', orderId: 'ord-125', fromStatus: 'in_progress', toStatus: 'in_review', createdAt: '2026-04-15T15:00:00Z' },
    { id: 'evt-9', orderId: 'ord-125', fromStatus: 'in_review', toStatus: 'delivered', createdAt: '2026-04-18T10:00:00Z' },
  ]
};

export const MOCK_KPIS = {
  activeOrders: 2,
  inReview: 1,
  deliveredThisMonth: 1,
};
