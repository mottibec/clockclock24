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
    label: 'Navy Blue',
    background: '#1a237e',
    clockFace: '#1a237e',
    hands: '#ffffff'
  },
  {
    label: 'Royal Blue',
    background: '#1565c0',
    clockFace: '#1565c0',
    hands: '#ffffff'
  },
  {
    label: 'Midnight Blue',
    background: '#0d47a1',
    clockFace: '#0d47a1',
    hands: '#ffffff'
  },
  {
    label: 'Deep Navy',
    background: '#0a1845',
    clockFace: '#0a1845',
    hands: '#ffffff'
  }
]

function App() {
  const [time, setTime] = useState<string>(formatTime(new Date()))
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(colorSchemes[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = formatTime(new Date())
      if (newTime !== time) {
        setTime(newTime)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [time])

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
            style={{
              padding: '8px 12px',
              border: `2px solid ${scheme.background}`,
              borderRadius: '6px',
              background: selectedScheme.label === scheme.label ? scheme.background : 'transparent',
              color: selectedScheme.label === scheme.label ? '#ffffff' : scheme.background,
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              fontWeight: selectedScheme.label === scheme.label ? '600' : '400'
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
