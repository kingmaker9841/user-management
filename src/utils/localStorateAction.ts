export const lsGet = (item: string) => {
  const getValue = localStorage.getItem(item)
  if (getValue) {
    return JSON.parse(getValue)
  }
  return null
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lsSet = (name: string, value: any) =>
  localStorage.setItem(name, JSON.stringify(value))
