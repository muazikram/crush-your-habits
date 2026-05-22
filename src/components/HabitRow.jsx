import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlayingCard from './PlayingCard'
import StreakBadge from './StreakBadge'
import { calculateStreak } from '../utils/streak'

export default function HabitRow({ habit, weekDates, completions, onToggle, onRename, onDelete }) {
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="contents"
    >
      {/* Habit name cell */}
      <div className="bg-[#1A0A04] border border-[#3D2210] border-r-0 rounded-l-lg flex items-center gap-2 px-2 py-1 min-h-[46px] my-0.5 group">
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
              className="flex-1 text-[11px] text-[#D3C8B8] leading-tight truncate"
            >
              {habit.name}
            </motion.span>
          )}
        </AnimatePresence>

        <StreakBadge count={count} danger={danger} />

        {/* action buttons — show on hover */}
        <div className="hidden group-hover:flex items-center gap-1 ml-1">
          <button
            onClick={() => { setEditing(true); setEditValue(habit.name) }}
            className="text-[#888780] hover:text-[#FAC775] text-[10px] transition-colors"
            title="Rename"
          >
            ✏
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="text-[#888780] hover:text-[#E24B4A] text-[10px] transition-colors"
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Day cells */}
      {weekDates.map((dateStr) => (
        <div
          key={dateStr}
          className={`border-t border-b border-[#3D2210] last:border-r last:rounded-r-lg last:border-[#3D2210] flex items-center justify-center min-h-[46px] my-0.5
            ${dateStr === weekDates[3] || dateStr === weekDates.find(d => d === new Date().toISOString().split('T')[0])
              ? 'bg-[#2A1208]'
              : 'bg-[#1A0A04]'
            }`}
        >
          <PlayingCard
            dateStr={dateStr}
            completed={completions[habit.id]?.[dateStr] === true}
            onToggle={() => onToggle(habit.id, dateStr)}
          />
        </div>
      ))}
    </motion.div>
  )
}