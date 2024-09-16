import { ROUTES } from "./routes"

export const getPath = (name: string, id?: string) => {
  if (!name) return ""
  if (id) {
    return ROUTES.find(route => route.name === name)?.path.replace(":id", id)
  }
  return ROUTES.find(route => route.name === name)?.path
}