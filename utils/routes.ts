
export const ROUTES = [
  {
    name: "Home",
    path: "/",
    onMenu: true
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
    name: "Edit Balances",
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
    name: "Edit Topics",
    path: "/topics/:id",
  }
]

export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register"
}