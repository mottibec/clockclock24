import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ClockGrid from './components/ClockGrid'
import { formatTime, getCurrentDigits } from './utils/time'
import './App.css'

function App() {
  const [time, setTime] = useState<string>(formatTime(new Date()))
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [isManual, setIsManual] = useState<boolean>(false)

  useEffect(() => {
    // Update time every second when not in manual mode
    if (!isManual) {
      const interval = setInterval(() => {
        const newTime = formatTime(new Date())
        if (newTime !== time) {
          setIsAnimating(true)
          setTime(newTime)
          // Stop animation after 1.5 seconds
          setTimeout(() => setIsAnimating(false), 1500)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [time, isManual])

  return (
    <div className="App" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      color: '#000000'
    }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

      </motion.h1>

      <motion.div
        className="controls"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.03)'
        }}
      >
        <input
          type="checkbox"
          id="manual-mode"
          checked={isManual}
          onChange={(e) => setIsManual(e.target.checked)}
          style={{ cursor: 'pointer' }}
        />
        <label
          htmlFor="manual-mode"
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            fontSize: '14px'
          }}
        >
          Manual Mode
        </label>
      </motion.div>

      <ClockGrid time={time} animate={isAnimating} manual={isManual} />
    </div>
  )
}

export default App
