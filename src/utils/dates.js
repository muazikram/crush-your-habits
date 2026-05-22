import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

// Returns today's date as "YYYY-MM-DD"
export function today() {
  return dayjs().format('YYYY-MM-DD')
}

// Returns array of 7 date strings for the week containing the given date
// Week starts Monday (ISO standard)
export function getWeekDates(date) {
  const start = dayjs(date).startOf('isoWeek')
  return Array.from({ length: 7 }, (_, i) =>
    start.add(i, 'day').format('YYYY-MM-DD')
  )
}

// Returns "Mon", "Tue" etc from a date string
export function getDayLabel(dateStr) {
  return dayjs(dateStr).format('ddd')
}

// Returns "May 19 – 25, 2026" style label
export function getWeekLabel(dates) {
  const start = dayjs(dates[0]).format('MMM D')
  const end = dayjs(dates[6]).format('D, YYYY')
  return `${start} – ${end}`
}

// Is a date in the future?
export function isFuture(dateStr) {
  return dayjs(dateStr).isAfter(dayjs(), 'day')
}

// Is a date today?
export function isToday(dateStr) {
  return dateStr === today()
}

// Move one week forward or backward from a date
export function shiftWeek(date, direction) {
  return dayjs(date).add(direction === 'next' ? 7 : -7, 'day').format('YYYY-MM-DD')
}

// Is the given week the current week?
export function isCurrentWeek(dates) {
  return dates.includes(today())
}