export const fontHighLight = (newstr, str) => {
  const reg = new RegExp(str, 'ig')
  return newstr.replace(reg, match => {
    return `<span style="color:red;">${match}</span>`
  })
}
