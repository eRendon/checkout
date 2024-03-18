export const validateForms = <T>(data: Partial<T>): boolean => {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key]
      console.log('value', value)
      console.log('value', data[key])
      if ((value as string).trim() === '') {
        return false
      }
    }
  }
  return true
}
