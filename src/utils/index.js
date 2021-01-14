// 唯一键
export function generateId() {
  const s = []
  const hexDigits = '0123456789abcdef'
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  // bits 12-15 of the time_hi_and_version field to 0010
  s[14] = '4'
  // eslint-disable-next-line no-bitwise
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  // eslint-disable-next-line no-multi-assign
  s[8] = s[13] = s[18] = s[23] = '-'

  return s.join('')
}
