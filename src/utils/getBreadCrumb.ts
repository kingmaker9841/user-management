/* eslint-disable @typescript-eslint/no-explicit-any */
export const getBreadCrumb = (location: string) => {
  const path = location.split('/')
  const newPath = [] as any
  path.forEach((p) => {
    if (p === '' || p === ' ') return
    p = p.charAt(0).toUpperCase() + p.slice(1, p.length)
    if (p.indexOf('-') > 0) {
      const other = p
        .split('-')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1, s.length))
        .join(' ')
      newPath.push(other)
    } else {
      newPath.push(p)
    }
  })
  return newPath
}
