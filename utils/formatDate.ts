import { Timestamp } from "firebase/firestore"

export const formatDate = (date: Timestamp, locale ="es-ES", options?: Intl.DateTimeFormatOptions) => {
  if (!date) return null
  const _date = new Date(date?.seconds * 1000)
  return Intl.DateTimeFormat(locale, options).format(_date)
}