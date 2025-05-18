"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface UseOverflowOptions {
  /**
   * Whether to check for horizontal overflow
   */
  horizontal?: boolean
  /**
   * Whether to check for vertical overflow
   */
  vertical?: boolean
  /**
   * Whether to recheck on window resize
   */
  checkOnResize?: boolean
}

interface UseOverflowResult {
  /**
   * Reference to attach to the element
   */
  ref: RefObject<HTMLElement>
  /**
   * Whether the element is overflowing
   */
  isOverflowing: boolean
  /**
   * Whether the element is overflowing horizontally
   */
  isOverflowingHorizontally: boolean
  /**
   * Whether the element is overflowing vertically
   */
  isOverflowingVertically: boolean
  /**
   * Force a recheck of overflow status
   */
  checkOverflow: () => void
}

/**
 * Custom hook to detect if an element's content is overflowing
 */
export function useOverflow<T extends HTMLElement = HTMLDivElement>(
  options: UseOverflowOptions = {},
): UseOverflowResult {
  const { horizontal = true, vertical = true, checkOnResize = true } = options

  const ref = useRef<T>(null)
  const [isOverflowingHorizontally, setIsOverflowingHorizontally] = useState(false)
  const [isOverflowingVertically, setIsOverflowingVertically] = useState(false)

  const checkOverflow = () => {
    if (!ref.current) return

    if (horizontal) {
      setIsOverflowingHorizontally(ref.current.scrollWidth > ref.current.clientWidth)
    }

    if (vertical) {
      setIsOverflowingVertically(ref.current.scrollHeight > ref.current.clientHeight)
    }
  }

  useEffect(() => {
    checkOverflow()

    // Set up ResizeObserver to detect changes in element size
    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(() => {
        checkOverflow()
      })

      if (ref.current) {
        resizeObserver.observe(ref.current)
      }

      return () => {
        if (ref.current) {
          resizeObserver.unobserve(ref.current)
        }
        resizeObserver.disconnect()
      }
    }

    // Fall back to window resize event if ResizeObserver is not available
    if (checkOnResize) {
      window.addEventListener("resize", checkOverflow)
      return () => {
        window.removeEventListener("resize", checkOverflow)
      }
    }
  }, [horizontal, vertical, checkOnResize])

  return {
    ref,
    isOverflowing: isOverflowingHorizontally || isOverflowingVertically,
    isOverflowingHorizontally,
    isOverflowingVertically,
    checkOverflow,
  }
}

