export const combine = (...classNames: Array<string | undefined | boolean>) =>
  classNames.filter(Boolean).join(" ")