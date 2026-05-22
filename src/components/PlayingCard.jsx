import { motion, AnimatePresence } from 'framer-motion'
import { isFuture, isToday } from '../utils/dates'

export default function PlayingCard({ dateStr, completed, onToggle }) {
  const future = isFuture(dateStr)
  const today = isToday(dateStr)

  function handleClick() {
    if (future) return
    onToggle()
  }

  return (
    <motion.div
      whileTap={future ? {} : { scale: 0.85 }}
      onClick={handleClick}
      className={`relative w-7 h-9 rounded-[4px] border-2 flex items-center justify-center cursor-pointer select-none
        ${future ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer'}
        ${completed
          ? 'bg-[#EF9F27] border-[#FAC775]'
          : today
            ? 'bg-[#EDE0BC] border-[#FAC775]'
            : 'bg-[#EDE0BC] border-[#5F4030]'
        }`}
    >
      {/* inner card border */}
      <div className="absolute inset-[2px] border border-[#C8A870] rounded-[2px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {completed ? (
          <motion.svg
            key="check"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className="w-4 h-4 relative z-10"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3 8l3.5 3.5L13 5"
              stroke="#412402"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        ) : (
          <motion.div
            key="blank"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-2.5 h-3 bg-[#D4B888] rounded-[1px] relative z-10"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}