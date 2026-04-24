'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ContentType, OrderStatus } from '@/lib/mock-data'

export type Order = {
  id: string
  user_id: string
  content_type: ContentType
  title: string
  word_count: number
  due_date: string
  status: OrderStatus
  deliverable_path?: string
  created_at: string
}

export type OrderEvent = {
  id: string
  order_id: string
  from_status?: OrderStatus
  to_status: OrderStatus
  note?: string
  created_at: string
}

export async function getOrders() {
  const supabase = await createClient()
  
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  // Convert snake_case to camelCase to match the existing UI if necessary,
  // or we can just return it and map it.
  return (orders as any[]).map(o => ({
    id: o.id,
    contentType: o.content_type,
    title: o.title,
    wordCount: o.word_count,
    dueDate: o.due_date,
    status: o.status,
    deliverablePath: o.deliverable_path,
    createdAt: o.created_at,
  }))
}

export async function getOrder(id: string) {
  const supabase = await createClient()

  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !order) return null

  return {
    id: order.id,
    contentType: order.content_type,
    title: order.title,
    wordCount: order.word_count,
    dueDate: order.due_date,
    status: order.status,
    deliverablePath: order.deliverable_path,
    createdAt: order.created_at,
  }
}

export async function getOrderEvents(id: string) {
  const supabase = await createClient()

  const { data: events, error } = await supabase
    .from('order_events')
    .select('*')
    .eq('order_id', id)
    .order('created_at', { ascending: true })

  if (error || !events) return []

  return (events as any[]).map(e => ({
    id: e.id,
    orderId: e.order_id,
    fromStatus: e.from_status,
    toStatus: e.to_status,
    note: e.note,
    createdAt: e.created_at,
  }))
}

export async function createOrder(data: {
  title: string
  contentType: ContentType
  wordCount: number
  dueDate: string
}) {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) {
    throw new Error('You must be logged in to create an order')
  }

  const { data: newOrder, error } = await supabase
    .from('orders')
    .insert({
      user_id: userData.user.id,
      title: data.title,
      content_type: data.contentType,
      word_count: data.wordCount,
      due_date: data.dueDate,
      status: 'submitted',
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating order:', error)
    throw new Error(error.message)
  }

  // Insert the initial event
  await supabase.from('order_events').insert({
    order_id: newOrder.id,
    to_status: 'submitted',
  })

  revalidatePath('/dashboard')
  revalidatePath('/orders')
  
  return newOrder.id
}
