const setLocalStore = <T>(data:T, key: string): void => {
  localStorage.setItem(key, JSON.stringify(data))
}

const getLocalStore = <T>(key: string): T | null => {
  const data: string | null = localStorage.getItem(key)
  if (data) {
    return JSON.parse(data) as T
  }
  return null
}

export { setLocalStore, getLocalStore }
