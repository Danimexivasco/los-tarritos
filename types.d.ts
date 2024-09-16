export interface Activity {
  id?: string
  // type: "short" | "medium" | "large"
  // status: "To do" |"In progress" | "Done"
  type: string
  status: string
  text: string
  updatedAt?: Array<Date>
  createdAt: Date
}