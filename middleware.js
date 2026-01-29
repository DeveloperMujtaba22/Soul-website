import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes - these are accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/about(.*)',
  '/program(.*)',
  '/application(.*)',           // Add this - make application form public
  '/application-process(.*)',
  '/community(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/forgot-password(.*)',
  '/reset-password(.*)',
  '/api/webhooks/clerk(.*)'
])

export default clerkMiddleware((auth, req) => {
  // If the route is public, don't require authentication
  if (isPublicRoute(req)) {
    return // Allow access without authentication
  }
  
  // Otherwise, require authentication
  auth().protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}