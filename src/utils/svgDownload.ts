const download = function (href: string, name: string) {
  const link = document.createElement('a')
  link.download = name
  link.style.opacity = '0'
  document.body.append(link)
  link.href = href
  link.click()
  link.remove()
}

export const downloadPNG = (id: string) => {
  const svgElement = document.getElementById(id) as any
  let width: any
  let height: any
  let clonedSvgElement
  if (svgElement) {
    width = svgElement.clientWidth
    height = svgElement.clientHeight
    clonedSvgElement = svgElement.cloneNode(true)
  }
  const outerHTML = clonedSvgElement.outerHTML
  const blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' })
  const URL = window.URL || window.webkitURL || window
  const blobURL = URL.createObjectURL(blob)
  const image = new Image()
  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = width || 400
    canvas.height = height || 400
    const context = canvas.getContext('2d')
    if (context) context.drawImage(image, 0, 0, width, height)
    const png = canvas.toDataURL()
    download(png, 'image.png')
  }
  image.src = blobURL
}
