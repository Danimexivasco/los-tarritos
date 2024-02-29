export const combine = (...classNames: Array<String>) =>
  classNames.filter(Boolean).join(" ")