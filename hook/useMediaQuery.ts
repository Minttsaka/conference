"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook that returns whether a media query matches the current viewport
 * @param query - CSS media query string (e.g. "(min-width: 768px)")
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with null and update after mount to avoid hydration mismatch
  const [matches, setMatches] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)

    // Check if window is available (client-side only)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Set initial value
      setMatches(media.matches)

      // Define listener function
      const listener = (event: MediaQueryListEvent): void => {
        setMatches(event.matches)
      }

      // Add listener for changes
      // Use the modern API if available, fall back to deprecated API if not
      if (media.addEventListener) {
        media.addEventListener("change", listener)
      } else {
        // @ts-ignore - For older browsers
        media.addListener(listener)
      }

      // Clean up
      return () => {
        if (media.removeEventListener) {
          media.removeEventListener("change", listener)
        } else {
          // @ts-ignore - For older browsers
          media.removeListener(listener)
        }
      }
    }

    // Empty dependency array ensures this only runs once on mount
  }, [query])

  // Return false during SSR to avoid hydration mismatch
  return mounted ? matches : false
}

