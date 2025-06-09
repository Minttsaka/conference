import { ObjectId } from "bson"

/**
 * Generate a new MongoDB ObjectId as a string
 */
export function generateObjectId(): string {
  return new ObjectId().toString()
}

/**
 * Check if a string is a valid ObjectId
 */
export function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id)
}

/**
 * Convert a string to ObjectId (for database operations)
 */
export function toObjectId(id: string): ObjectId {
  return new ObjectId(id)
}
