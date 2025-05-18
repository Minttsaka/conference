import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export function getInitials(name: string): string {
  const nameParts = name.split(" ")
  let initials = ""
  for (let i = 0; i < Math.min(nameParts.length, 2); i++) {
    initials += nameParts[i].charAt(0).toUpperCase()
  }
  return initials
}

