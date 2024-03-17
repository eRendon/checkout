const formateDate = (date: Date, options: Intl.DateTimeFormatOptions): string => {
  return date.toLocaleDateString('es-ES', options)
}

export default formateDate
