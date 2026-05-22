import { motion } from 'framer-motion'

export default function EmptyState({ onAdd }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="flex flex-col items-center justify-center py-10 px-6 gap-4"
    >
      {/* stacked cards illustration */}
      <div className="relative w-20 h-24 mb-2">
        {[2, 1, 0].map((i) => (
          <motion.div
            key={i}
            initial={{ rotate: 0 }}
            animate={{ rotate: i === 0 ? -8 : i === 2 ? 8 : 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
            className="absolute inset-0 bg-[#EDE0BC] border-2 border-[#5F4030] rounded-lg"
            style={{ top: i * 6, left: i * 4 }}
          >
            <div className="absolute inset-[3px] border border-[#C8A870] rounded-md" />
          </motion.div>
        ))}
      </div>

      <h2 className="text-[15px] font-medium text-[#FAC775] text-center">
        No habits yet, partner
      </h2>

      <p className="text-[11px] text-[#888780] text-center leading-relaxed max-w-[220px]">
        Add your first habit and start building your streak. Every legend starts somewhere.
      </p>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        onClick={onAdd}
        className="mt-2 bg-[#C8391A] border-2 border-[#E8A040] rounded-full px-6 py-2 text-[12px] font-medium text-[#FAC775] flex items-center gap-2 hover:bg-[#A02D14] transition-colors"
      >
        <span>+</span> Deal your first habit
      </motion.button>
    </motion.div>
  )
}