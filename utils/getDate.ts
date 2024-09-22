import { Timestamp } from "firebase/firestore"

export const getDate = (date: Timestamp | Date | undefined | string) => {
  if (!date) return
  if (typeof date === "string") date = new Date(date)
  date = date instanceof Timestamp ? date.toDate() : date
  return date
}