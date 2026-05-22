import dayjs from 'dayjs'
import { today } from './dates'

// Calculate streak for a single habit
// Returns { count, danger }
// danger = true means today is unchecked — streak is at risk
export function calculateStreak(habitId, completions) {
  const habitCompletions = completions[habitId] || {}
  const todayStr = today()
  const todayDone = habitCompletions[todayStr] === true

  // Start counting from today if done, yesterday if not
  let cursor = todayDone
    ? dayjs(todayStr)
    : dayjs(todayStr).subtract(1, 'day')

  let count = 0

  // Walk backwards counting consecutive completed days
  while (true) {
    const dateStr = cursor.format('YYYY-MM-DD')
    if (habitCompletions[dateStr] === true) {
      count++
      cursor = cursor.subtract(1, 'day')
    } else {
      break
    }
  }

  return {
    count,
    danger: !todayDone && count > 0
  }
}