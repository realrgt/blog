'use client'

import React, { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.SYSTEM)
  const [resolvedTheme, setResolvedTheme] = useState<Theme.LIGHT | Theme.DARK>(Theme.LIGHT)
  const [mounted, setMounted] = useState<boolean>(false)
  const isInitialMount = useRef(true)

  const updateTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme)
    if (newTheme === Theme.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? Theme.DARK
        : Theme.LIGHT
      setResolvedTheme(systemTheme)
    } else {
      setResolvedTheme(newTheme)
    }
    localStorage.setItem('theme', newTheme)
  }, [])

  // Switching locale re-renders the root layout's <html> and React drops the
  // `dark` class, so it has to be restored whenever it goes out of sync.
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const syncDarkClass = () => {
      const isDark = resolvedTheme === Theme.DARK
      if (root.classList.contains('dark') !== isDark) {
        root.classList.toggle('dark', isDark)
      }
    }

    syncDarkClass()
    const observer = new MutationObserver(syncDarkClass)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [mounted, resolvedTheme])

  useEffect(() => {
    if (isInitialMount.current) {
      const savedTheme = localStorage.getItem('theme') as Theme | null
      if (savedTheme) {
        updateTheme(savedTheme)
      } else {
        updateTheme(Theme.SYSTEM)
      }
      setMounted(true)
      isInitialMount.current = false
    }
  }, [updateTheme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === Theme.SYSTEM) {
        updateTheme(Theme.SYSTEM)
      }
    }
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [theme, updateTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
