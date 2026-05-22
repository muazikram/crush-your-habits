import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlayingCard from './PlayingCard'
import StreakBadge from './StreakBadge'
import { calculateStreak } from '../utils/streak'
import { isToday } from '../utils/dates'

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
      <div className="bg-[#1A0A04] border border-[#3D2210] border-r-0 rounded-l-lg flex items-center gap-2 px-2 py-1 min-h-[52px] my-0.5">

        <div className="flex flex-col flex-1 min-w-0 gap-1">
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
                className="bg-transparent border-none outline-none text-[11px] text-[#FAC775] font-medium w-full"
              />
            ) : (
              <motion.span
                key="name"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[11px] text-[#D3C8B8] leading-tight truncate"
              >
                {habit.name}
              </motion.span>
            )}
          </AnimatePresence>

          {/* edit + delete always visible below name */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => { setEditing(true); setEditValue(habit.name) }}
              className="flex items-center gap-1 text-[9px] text-[#888780] hover:text-[#FAC775] transition-colors"
              title="Rename"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>
            <span className="text-[#3D2210] text-[9px]">·</span>
            <button
              onClick={() => onDelete(habit.id)}
              className="flex items-center gap-1 text-[9px] text-[#888780] hover:text-[#E24B4A] transition-colors"
              title="Delete"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
              Delete
            </button>
          </div>
        </div>

        <StreakBadge count={count} danger={danger} />
      </div>

      {/* Day cells */}
      {weekDates.map((dateStr) => (
        <div
          key={dateStr}
          className={`border-t border-b border-[#3D2210] last:border-r last:rounded-r-lg last:border-[#3D2210] flex items-center justify-center min-h-[52px] my-0.5
            ${isToday(dateStr) ? 'bg-[#2A1208]' : 'bg-[#1A0A04]'}`}
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