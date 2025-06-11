"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface UseOverflowOptions {
  horizontal?: boolean
  vertical?: boolean
  checkOnResize?: boolean
}

interface UseOverflowResult<T extends HTMLElement> {
  ref: React.RefObject<T>
  isOverflowing: boolean
  isOverflowingHorizontally: boolean
  isOverflowingVertically: boolean
  checkOverflow: () => void
}

/**
 * Custom hook to detect if an element's content is overflowing
 */

export function useOverflow<T extends HTMLElement = HTMLDivElement>(
  options: UseOverflowOptions = {},
): UseOverflowResult<T> {
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

