export interface Activity {
  id?: string
  // type: "short" | "medium" | "large"
  // status: "To do" |"In progress" | "Done"
  type: string
  status: string
  text: string
  // TODO: Check updatedAt as array or Date
  updatedAt?: Array<Date>
  createdAt: Date
}

export interface Topic {
  [key: string]: string | Date;
  id?: string
  status: "To do" | "Done"
  title: string
  description: string
  updatedAt?: Date
  createdAt: Date
  createdBy: string
}