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

interface Point {
  id: string
  text: string
  isFromPreviousBalance?: boolean
}
interface Points {
  good: Array<Point>
  bad: Array<Point>
}
export interface Balance {
  id?: string
  date: Date | string | undefined
  description?: string
  points: Points
  updatedAt?: Date
  createdAt: Date
  createdBy: string
}

export interface YearlyBalances {
  [key: number]: Array<Balance>
}

export interface Recipe {
  id?: string
  title: string
  url?: string
  time?: number | null
  tags?: string
  ingredients?: string
  difficulty: "Easy" | "Medium" | "Hard"
  instructions?: string
  updatedAt?: Date
  createdAt: Date
  createdBy: string
}

export interface RecipesFilters {
  search: string
  time: string
  difficulty: string
}