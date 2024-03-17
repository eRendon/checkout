import serializeObject from '@/utils/serializeObject'

const setLocalStore = <T>(data:T, key: string): void => {
  console.log(serializeObject(data))
  localStorage.setItem(key, JSON.parse(serializeObject(data)))
}

const getLocalStore = <T>(key: string): T | null => {
  const data: string = localStorage.getItem(key)
  if (data) {
    return JSON.stringify(data) as T
  }
  return null
}

export { setLocalStore, getLocalStore }
