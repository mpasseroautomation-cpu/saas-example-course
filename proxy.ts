import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Run on every request EXCEPT:
     * - Next.js internal paths
     * - the favicon
     * - any path with a static-asset file extension
     *
     * Server Actions are POSTs to page routes (no file extension), so they
     * still hit the middleware and get authenticated.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|woff|woff2|ico|css|js|map)$).*)',
  ],
}
