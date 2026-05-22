import { AnimatePresence } from 'framer-motion'
import HabitRow from './HabitRow'
import { getDayLabel, isToday } from '../utils/dates'

export default function WeekGrid({ habits, weekDates, completions, onToggle, onRename, onDelete }) {
  return (
    <div
      className="grid gap-x-[2px]"
      style={{ gridTemplateColumns: `minmax(0, 1.5fr) repeat(7, minmax(0, 1fr))` }}
    >
      {/* Day headers */}
      <div /> {/* empty corner */}
      {weekDates.map((dateStr) => {
        const today = isToday(dateStr)
        return (
          <div key={dateStr} className="flex flex-col items-center">
            {today && (
              <div className="w-full h-1 bg-[#5F3A1A] rounded-t mb-0.5" />
            )}
            <span className={`text-[8px] font-medium tracking-widest uppercase pb-1
              ${today ? 'text-[#FAC775]' : 'text-[#5F5E5A]'}`}>
              {getDayLabel(dateStr)}
            </span>
          </div>
        )
      })}

      {/* Habit rows */}
      <AnimatePresence>
        {habits.map((habit) => (
          <HabitRow
            key={habit.id}
            habit={habit}
            weekDates={weekDates}
            completions={completions}
            onToggle={onToggle}
            onRename={onRename}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}