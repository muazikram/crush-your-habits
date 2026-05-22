import { motion } from 'framer-motion'

export default function StreakBadge({ count, danger }) {
  if (count === 0) return (
    <span className="text-[9px] px-2 py-0.5 rounded-full border border-[#3D2210] bg-[#1A0A04] text-[#5F5E5A] whitespace-nowrap">
      0d
    </span>
  )

  return (
    <motion.span
      key={count}
      initial={{ scale: 1.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`text-[9px] px-2 py-0.5 rounded-full border whitespace-nowrap font-medium
        ${danger
          ? 'bg-[#3D0A0A] border-[#E24B4A] text-[#E24B4A]'
          : 'bg-[#412402] border-[#EF9F27] text-[#FAC775]'
        }`}
    >
      {danger ? `⚠ ${count}d` : `${count}d`}
    </motion.span>
  )
}