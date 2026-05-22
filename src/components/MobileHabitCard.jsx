import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlayingCard from './PlayingCard'
import StreakBadge from './StreakBadge'
import { calculateStreak } from '../utils/streak'
import { isToday } from '../utils/dates'

export default function MobileHabitCard({ habit, weekDates, completions, onToggle, onRename, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(habit.name)
  const { count, danger } = calculateStreak(habit.id, completions)

  function handleRename() {
    if (editValue.trim() && editValue.trim() !== habit.name) {
      onRename(habit.id, editValue.trim())
    }
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleRename()
    if (e.key === 'Escape') {
      setEditValue(habit.name)
      setEditing(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-[#1A0A04] border-2 border-[#3D2210] rounded-xl px-3 py-2.5 group"
    >
      {/* top row — name + streak + actions */}
      <div className="flex items-center gap-2 mb-3">
        <AnimatePresence mode="wait">
          {editing ? (
            <motion.input
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              autoFocus
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[11px] text-[#FAC775] font-medium"
            />
          ) : (
            <motion.span
              key="name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 text-[11px] font-medium text-[#FAC775] truncate"
            >
              {habit.name}
            </motion.span>
          )}
        </AnimatePresence>

        <StreakBadge count={count} danger={danger} />

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setEditing(true); setEditValue(habit.name) }}
            className="text-[#888780] hover:text-[#FAC775] text-[10px] transition-colors"
          >
            ✏
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="text-[#888780] hover:text-[#E24B4A] text-[10px] transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* day cards row — fluid flex so Sunday never overflows */}
      <div className="flex gap-0 justify-between w-full">
        {weekDates.map((dateStr) => (
          <div key={dateStr} className="flex flex-col items-center gap-1 flex-1">
            <span className={`text-[7px] font-medium tracking-wider uppercase
              ${isToday(dateStr) ? 'text-[#FAC775]' : 'text-[#5F5E5A]'}`}>
              {new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
            </span>
            <PlayingCard
              dateStr={dateStr}
              completed={completions[habit.id]?.[dateStr] === true}
              onToggle={() => onToggle(habit.id, dateStr)}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}