"use client"

// lib/analytics.ts
type EventName =
  | "page_view"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "checkout_start"
  | "checkout_complete"
  | "report_view"
  | "report_download"

interface EventProperties {
  [key: string]: string | number | boolean | undefined
}

/**
 * Tracks an event for analytics
 */
export function trackEvent(eventName: EventName, properties?: EventProperties) {
  // In a production environment, you would send this to your analytics provider
  // For now, we'll just log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, properties)
  }

  // Example implementation for a real analytics provider:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', eventName, properties);
  // }
}

/**
 * Tracks a page view
 */
export function trackPageView(url: string) {
  trackEvent("page_view", { url })
}

/**
 * Initializes analytics tracking
 */
export function initAnalytics() {
  if (typeof window === "undefined") return

  // Track initial page view
  trackPageView(window.location.pathname)

  // Set up navigation tracking
  const handleRouteChange = (url: string) => {
    trackPageView(url)
  }

  // In a real implementation, you would hook this into your router
  // For example, with Next.js App Router:
  // const router = useRouter();
  // useEffect(() => {
  //   router.events.on('routeChangeComplete', handleRouteChange);
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);
}
