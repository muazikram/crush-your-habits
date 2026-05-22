import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHabits } from './hooks/useHabits'
import { getWeekDates, getWeekLabel, shiftWeek, isCurrentWeek, today } from './utils/dates'
import WeekGrid from './components/WeekGrid'
import MobileHabitCard from './components/MobileHabitCard'
import EmptyState from './components/EmptyState'
import AddHabitInput from './components/AddHabitInput'

export default function App() {
  const { habits, completions, addHabit, renameHabit, deleteHabit, toggleCompletion } = useHabits()
  const [currentDate, setCurrentDate] = useState(today())
  const [showAdd, setShowAdd] = useState(false)

  const weekDates = getWeekDates(currentDate)
  const weekLabel = getWeekLabel(weekDates)
  const onCurrentWeek = isCurrentWeek(weekDates)

  function handlePrev() {
    setCurrentDate(prev => shiftWeek(prev, 'prev'))
  }

  function handleNext() {
    if (onCurrentWeek) return
    setCurrentDate(prev => shiftWeek(prev, 'next'))
  }

  function handleBackToToday() {
    setCurrentDate(today())
  }

  function handleAdd(name) {
    addHabit(name)
    setShowAdd(false)
  }

  return (
    <div className="min-h-screen bg-[#5BA8A0] flex items-start justify-center p-3 sm:p-4">

      {/* desert background elements */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#C4873A] pointer-events-none z-0" />
      <div className="fixed bottom-10 left-0 right-0 h-10 bg-[#D4A055] pointer-events-none z-0" />

      {/* saloon building */}
      <div className="fixed bottom-16 left-8 w-10 h-14 bg-[#C8874A] rounded-sm pointer-events-none z-0">
        <div className="absolute -top-3 left-1 w-8 h-4 bg-[#A06030] rounded-t-sm" />
        <div className="absolute top-3 left-2 w-3 h-3 bg-[#5BA8A0] rounded-sm" />
      </div>

      {/* cactus */}
      <div className="fixed bottom-16 right-10 w-3 h-10 bg-[#2D5A1E] rounded-sm pointer-events-none z-0">
        <div className="absolute top-2 -left-2 w-2 h-4 bg-[#2D5A1E] rounded-tl-sm rounded-bl-sm" />
        <div className="absolute top-1 -right-2 w-2 h-3 bg-[#2D5A1E] rounded-tr-sm rounded-br-sm" />
      </div>

      {/* main card */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* coral ring border */}
        <div className="border-[7px] border-[#C8391A] rounded-[18px] bg-[#3D1A0A] p-[3px] outline outline-[2.5px] outline-[#E8783A]">

          {/* gold chain decoration */}
          <div className="flex justify-between items-center px-3 py-1 bg-[#3D1A0A]">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#E8A040] border border-[#E8A040]" />
              <div className="w-2.5 h-1.5 border border-[#E8A040] rounded-sm" />
              <div className="w-2.5 h-1.5 border border-[#E8A040] rounded-sm" />
              <div className="w-2.5 h-1.5 border border-[#E8A040] rounded-sm" />
              <div className="w-2 h-2 rounded-full border border-[#E8A040]" />
            </div>
            <span className="text-[12px] font-medium text-[#FAC775] tracking-wide">
              Crush Your Habits
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full border border-[#E8A040]" />
              <div className="w-2.5 h-1.5 border border-[#E8A040] rounded-sm" />
              <div className="w-2.5 h-1.5 border border-[#E8A040] rounded-sm" />
              <div className="w-2.5 h-1.5 border border-[#E8A040] rounded-sm" />
              <div className="w-2 h-2 rounded-full bg-[#E8A040] border border-[#E8A040]" />
            </div>
          </div>

          {/* inner dark table */}
          <div className="bg-[#2A1208] rounded-[12px] p-3">

            {/* top bar — week nav */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-[#5F5E5A]">
                  {habits.length} habit{habits.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {!onCurrentWeek && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleBackToToday}
                    className="text-[9px] text-[#EF9F27] border border-[#EF9F27] rounded-full px-2 py-0.5 hover:bg-[#EF9F27] hover:text-[#1A0A04] transition-colors"
                  >
                    Today
                  </motion.button>
                )}

                <div className="bg-[#C8391A] border-2 border-[#E8A040] rounded-full px-3 py-1 flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={handlePrev}
                    className="text-[#EF9F27] font-medium text-sm leading-none"
                  >
                    ←
                  </motion.button>
                  <span className="text-[10px] font-medium text-[#FAC775]">
                    {weekLabel}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={handleNext}
                    className={`text-sm leading-none font-medium transition-opacity
                      ${onCurrentWeek ? 'text-[#5F3A1A] cursor-not-allowed' : 'text-[#EF9F27]'}`}
                  >
                    →
                  </motion.button>
                </div>
              </div>
            </div>

            {/* empty state or grid */}
            <AnimatePresence mode="wait">
              {habits.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyState onAdd={() => setShowAdd(true)} />
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* desktop grid — hidden on mobile */}
                  <div className="hidden sm:block">
                    <WeekGrid
                      habits={habits}
                      weekDates={weekDates}
                      completions={completions}
                      onToggle={toggleCompletion}
                      onRename={renameHabit}
                      onDelete={deleteHabit}
                    />
                  </div>

                  {/* mobile card stack — hidden on desktop */}
                  <div className="flex flex-col gap-2 sm:hidden">
                    <AnimatePresence>
                      {habits.map((habit) => (
                        <MobileHabitCard
                          key={habit.id}
                          habit={habit}
                          weekDates={weekDates}
                          completions={completions}
                          onToggle={toggleCompletion}
                          onRename={renameHabit}
                          onDelete={deleteHabit}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* footer */}
            <div className="flex items-center justify-between mt-3">
              <AddHabitInput onAdd={handleAdd} />
              <span className="text-[9px] text-[#5F5E5A]">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}