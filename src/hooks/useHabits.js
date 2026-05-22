import { useState, useEffect } from 'react'
import { today } from '../utils/dates'

// Load from localStorage or return default
function loadHabits() {
  try {
    const data = localStorage.getItem('habits')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function loadCompletions() {
  try {
    const data = localStorage.getItem('completions')
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

// Generate a simple unique id
function generateId() {
  return Math.random().toString(36).substring(2, 10)
}

export function useHabits() {
  const [habits, setHabits] = useState(loadHabits)
  const [completions, setCompletions] = useState(loadCompletions)

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  // Save completions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('completions', JSON.stringify(completions))
  }, [completions])

  // Add a new habit
  function addHabit(name) {
    const newHabit = {
      id: generateId(),
      name: name.trim(),
      createdAt: today()
    }
    setHabits(prev => [...prev, newHabit])
  }

  // Rename an existing habit
  function renameHabit(id, newName) {
    setHabits(prev =>
      prev.map(h => h.id === id ? { ...h, name: newName.trim() } : h)
    )
  }

  // Delete a habit and all its completions
  function deleteHabit(id) {
    setHabits(prev => prev.filter(h => h.id !== id))
    setCompletions(prev => {
      const updated = { ...prev }
      delete updated[id]
      return updated
    })
  }

  // Toggle a day's completion for a habit
  function toggleCompletion(habitId, dateStr) {
    setCompletions(prev => {
      const habitData = prev[habitId] || {}
      const current = habitData[dateStr] === true
      return {
        ...prev,
        [habitId]: {
          ...habitData,
          [dateStr]: !current
        }
      }
    })
  }

  // Check if a specific day is completed
  function isCompleted(habitId, dateStr) {
    return completions[habitId]?.[dateStr] === true
  }

  return {
    habits,
    completions,
    addHabit,
    renameHabit,
    deleteHabit,
    toggleCompletion,
    isCompleted
  }
}