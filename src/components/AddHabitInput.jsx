import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AddHabitInput({ onAdd }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  function handleAdd() {
    if (value.trim()) {
      onAdd(value.trim())
      setValue('')
      setOpen(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd()
    if (e.key === 'Escape') {
      setValue('')
      setOpen(false)
    }
  }

  return (
    <div className="mt-2">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-2 bg-[#3D1A0A] border-2 border-[#E8A040] rounded-xl px-3 py-2"
          >
            <span className="text-[#EF9F27] text-sm">🃏</span>
            <input
              autoFocus
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Name your habit..."
              className="flex-1 bg-transparent border-none outline-none text-[12px] text-[#FAC775] placeholder-[#5F5E5A]"
            />
            <button
              onClick={() => { setValue(''); setOpen(false) }}
              className="text-[10px] text-[#888780] hover:text-[#E24B4A] border border-[#5F4030] rounded-lg px-2 py-1 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="text-[10px] text-[#FAC775] bg-[#C8391A] border-2 border-[#E8A040] rounded-lg px-3 py-1 font-medium hover:bg-[#A02D14] transition-colors"
            >
              Deal it
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="bg-[#C8391A] border-2 border-[#E8A040] rounded-full px-4 py-1.5 text-[11px] font-medium text-[#FAC775] flex items-center gap-1.5 hover:bg-[#A02D14] transition-colors"
          >
            <span>+</span> New habit
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}