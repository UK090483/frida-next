type useDateProps = {
  date?: null | string
  endDate?: null | string
}

const useDate = (props: useDateProps) => {
  const { date, endDate } = props

  if (date && !endDate) {
    return formatDate(date)
  }

  if (date && endDate) {
    return formatDates(date, endDate)
  }

  return
}

export default useDate

const formatDate = (date: null | string) => {
  const dateArray = dateToArray(date)
  if (!dateArray) return
  return formatArray(dateArray)
}

const dateToArray = (date: null | string) => {
  if (!date) return
  try {
    const _date = new Date(date)
    const f = new Intl.DateTimeFormat('en')
    const d = f.format(_date).split('/')

    return [d[1], d[0], d[2]]
  } catch (error) {
    console.log(`unable to parse Date in useDate`)
    return
  }
}

const dateToObject = (date: null | string) => {
  if (!date) return
  try {
    const _date = new Date(date)
    const f = new Intl.DateTimeFormat('en')
    const d = f.format(_date).split('/')

    return { day: d[1], month: d[0], year: d[2] }
  } catch (error) {
    console.log(`unable to parse Date in useDate`)
    return
  }
}

const formatArray = (arr: string[]) => {
  return arr.join('.')
}
const formatObject = (date: ReturnType<typeof dateToObject>) => {
  if (!date) return ''
  return `${date.day}.${date.month}.${date.year}`
}

const isEndDateLater = (date: null | string, endDate: null | string) => {
  if (!date || !endDate) return false
  try {
    const _date = new Date(date)
    const _endDate = new Date(endDate)
    return _date.getTime() < _endDate.getTime()
  } catch (error) {
    return false
  }
}

const formatDates = (date: null | string, endDate: null | string) => {
  if (!date || !endDate) return ''
  if (!isEndDateLater(date, endDate)) return formatDate(date)
  const start = dateToObject(date)
  const end = dateToObject(endDate)
  if (!start || !end) return ''
  const isSameYear = start.year === end.year
  const isSameMonth = start.month === end.month
  const isSameDay = start.day === end.day

  if (isSameYear && isSameMonth && isSameDay) {
    return formatObject(start)
  }
  if (isSameYear && isSameMonth) {
    return formatArray([start.day]) + ' - ' + formatObject(end)
  }

  if (isSameYear) {
    return formatArray([start.day, start.month]) + ' - ' + formatObject(end)
  }

  return formatObject(start) + ' - ' + formatObject(end)
}
