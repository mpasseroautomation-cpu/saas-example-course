'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { ContentType, OrderStatus } from '@/lib/mock-data'
import { orderFormSchema } from '@/lib/validators/order'

type OrderRow = {
  id: string
  content_type: ContentType
  title: string
  word_count: number
  due_date: string
  status: OrderStatus
  deliverable_path?: string | null
  created_at: string
}

type OrderEventRow = {
  id: string
  order_id: string
  from_status?: OrderStatus | null
  to_status: OrderStatus
  note?: string | null
  created_at: string
}

export type Order = {
  id: string
  contentType: ContentType
  title: string
  wordCount: number
  dueDate: string
  status: OrderStatus
  deliverablePath?: string
  createdAt: string
}

export type OrderEvent = {
  id: string
  orderId: string
  fromStatus?: OrderStatus
  toStatus: OrderStatus
  note?: string
  createdAt: string
}

async function requireUser() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) {
    throw new Error('Unauthenticated')
  }
  return { supabase, user: data.user }
}

export async function getOrders() {
  const { supabase, user } = await requireUser()

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getOrders failed', { code: error.code })
    return []
  }

  return (orders as OrderRow[]).map(o => ({
    id: o.id,
    contentType: o.content_type,
    title: o.title,
    wordCount: o.word_count,
    dueDate: o.due_date,
    status: o.status,
    deliverablePath: o.deliverable_path ?? undefined,
    createdAt: o.created_at,
  }))
}

export async function getOrder(id: string) {
  const { supabase, user } = await requireUser()

  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !order) return null

  const o = order as OrderRow
  return {
    id: o.id,
    contentType: o.content_type,
    title: o.title,
    wordCount: o.word_count,
    dueDate: o.due_date,
    status: o.status,
    deliverablePath: o.deliverable_path ?? undefined,
    createdAt: o.created_at,
  }
}

export async function getOrderEvents(id: string) {
  const { supabase, user } = await requireUser()

  const { data: parent, error: parentError } = await supabase
    .from('orders')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (parentError || !parent) return []

  const { data: events, error } = await supabase
    .from('order_events')
    .select('*')
    .eq('order_id', id)
    .order('created_at', { ascending: true })

  if (error || !events) return []

  return (events as OrderEventRow[]).map(e => ({
    id: e.id,
    orderId: e.order_id,
    fromStatus: e.from_status ?? undefined,
    toStatus: e.to_status,
    note: e.note ?? undefined,
    createdAt: e.created_at,
  }))
}

export async function createOrder(input: unknown) {
  const parsed = orderFormSchema.safeParse(input)
  if (!parsed.success) {
    throw new Error('Invalid order data')
  }

  const { supabase, user } = await requireUser()
  const data = parsed.data

  const { data: newOrder, error } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      title: data.title,
      content_type: data.contentType,
      word_count: data.wordCount,
      due_date: data.dueDate,
      status: 'submitted',
    })
    .select()
    .single()

  if (error || !newOrder) {
    console.error('createOrder failed', { code: error?.code })
    throw new Error('Could not create order. Please try again.')
  }

  const { error: eventError } = await supabase.from('order_events').insert({
    order_id: newOrder.id,
    to_status: 'submitted',
  })

  if (eventError) {
    console.error('createOrder event insert failed', { code: eventError.code })
  }

  revalidatePath('/dashboard')
  revalidatePath('/orders')

  return newOrder.id
}
