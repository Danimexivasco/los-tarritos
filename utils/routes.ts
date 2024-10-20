
export const ROUTES = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Random Activities",
    path: "/activities",
    onMenu: true
  },
  {
    name: "New Activity",
    path: "/activities/new",
  },
  {
    name: "Edit Activity",
    path: "/activities/:id",
  },
  {
    name: "Balances",
    path: "/balances",
    onMenu: true
  },
  {
    name: "New Balance",
    path: "/balances/new",
  },
  {
    name: "Edit Balance",
    path: "/balances/:id",
  },
  {
    name: "Topics",
    path: "/topics",
    onMenu: true
  },
  {
    name: "New Topic",
    path: "/topics/new",
  },
  {
    name: "Edit Topic",
    path: "/topics/:id",
  },
  {
    name: "Recipes",
    path: "/recipes",
    onMenu: true
  },
  {
    name: "New Recipe",
    path: "/recipes/new",
  },
  {
    name: "Edit Recipe",
    path: "/recipes/:id",
  }
]

export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register"
}