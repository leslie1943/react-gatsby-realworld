let localUtil = null

if (typeof window !== `undefined`) {
  localUtil = window.localStorage
}

export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  if (localUtil) {
    localUtil.setItem(name, content)
  }
}

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return
  let value = localUtil ? localUtil.getItem(name) : ''
  if (value !== null) {
    try {
      value = JSON.parse(value)
    } catch (e) {
      value = ''
    }
  }
  return value
}

/**
 * 清除localStorage
 */
export const removeStore = (name) => {
  if (!name) return
  if (localUtil) {
    localUtil.removeItem(name)
  }
}
