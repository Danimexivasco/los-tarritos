import { ROUTES } from "./routes"

export const getPath = (name: string, id?: string): string => {
  if (!name) return ""
  if (id) {
    return ROUTES.find(route => route.name === name)?.path.replace(":id", id) as string
  }
  return ROUTES.find(route => route.name === name)?.path as string
}