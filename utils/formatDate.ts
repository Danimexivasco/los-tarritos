import { Timestamp } from "firebase/firestore"
import { getDate } from "./getDate";

export const formatDate = (date: Timestamp | Date | undefined | string, locale ="es-ES", options?: Intl.DateTimeFormatOptions) => {
  if (!date) return
  return Intl.DateTimeFormat(locale, options).format(getDate(date))
}