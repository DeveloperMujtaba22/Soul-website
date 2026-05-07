import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/about(.*)',
  '/program(.*)',
  '/application(.*)',
  '/application-process(.*)',
  '/community(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/forgot-password(.*)',
  '/reset-password(.*)',
  '/api/webhooks/clerk(.*)',
  '/contact(.*)',
  '/api/contact(.*)',
  '/api/checkout(.*)',  // <-- YEH ADD KARO
  '/success(.*)',        // <-- YEH BHI ADD KARO (post-payment redirect ke liye)
])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return
  }
  
  await auth.protect()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}