import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ClockGrid from './components/ClockGrid'
import { formatTime } from './utils/time'
import './App.css'

interface ColorScheme {
  background: string;
  clockFace: string;
  hands: string;
  label: string;
}

// Predefined color schemes inspired by the reference image
const colorSchemes: ColorScheme[] = [
  {
    label: 'White',
    background: '#ffffff',
    clockFace: '#ffffff',
    hands: '#000000'
  },
  {
    label: 'Black',
    background: '#000000',
    clockFace: '#000000',
    hands: '#ffffff'
  },
  {
    label: 'Blue',
    background: '#1565c0',
    clockFace: '#1565c0',
    hands: '#ffffff'
  }
]

function App() {
  const [time, setTime] = useState<string>("00:00")
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(colorSchemes[0])

  useEffect(() => {
    // Set initial time to 00:00
    setTime("00:00")

    // After a short delay, transition to current time
    const transitionTimer = setTimeout(() => {
      setTime(formatTime(new Date()))
    }, 1000)

    // Set up the regular time update interval
    const interval = setInterval(() => {
      const newTime = formatTime(new Date())
      if (newTime !== time) {
        setTime(newTime)
      }
    }, 1000)

    return () => {
      clearTimeout(transitionTimer)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--background-color', selectedScheme.background)
    document.documentElement.style.setProperty('--clock-face-color', selectedScheme.clockFace)
    document.documentElement.style.setProperty('--clock-hands-color', selectedScheme.hands)
  }, [selectedScheme])

  return (
    <div className="App" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}>

      <motion.div
        className="clock-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ClockGrid time={time} />
      </motion.div>

      <motion.div
        className="controls"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          marginBottom: '20px',
          display: 'flex',
          gap: '8px',
          padding: '16px',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}
      >
        {colorSchemes.map((scheme) => (
          <button
            key={scheme.label}
            onClick={() => setSelectedScheme(scheme)}
            className='color-scheme-button'
            style={{
              padding: '10px 16px',
              border: `2px solid ${scheme.background}`,
              borderRadius: '8px',
              background: scheme.background,
              color: scheme.hands,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: selectedScheme.label === scheme.label ? '600' : '400',
              boxShadow: selectedScheme.label === scheme.label ? `0 2px 8px ${scheme.hands}40` : 'none'
            }}
          >
            {scheme.label}
          </button>
        ))}
      </motion.div>
    </div>
  )
}

export default App
