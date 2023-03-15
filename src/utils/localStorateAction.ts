export const lsGet = (item: string) => {
  const getValue = localStorage.getItem(item)
  if (getValue) {
    return JSON.parse(getValue)
  }
  return null
}

export const lsGetTeams = () => {
  const getValue = localStorage.getItem('teams')
  if (getValue) {
    const parse = JSON.parse(getValue)
    return parse
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lsSet = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value))
}

export const lsRemove = (item: string) => localStorage.removeItem(item)
