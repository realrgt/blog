'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation as useI18nTranslation } from 'app/[locale]/i18n/client'

interface LocaleContextType {
  locale: LocaleTypes
  setLocale: (locale: LocaleTypes) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

interface LocaleProviderProps {
  children: React.ReactNode
  initialLocale?: LocaleTypes
}

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const params = useParams()
  const [locale, setLocaleState] = useState<LocaleTypes>(
    initialLocale || (params?.locale as LocaleTypes) || 'en'
  )

  // Update locale when URL params change
  useEffect(() => {
    if (params?.locale && params.locale !== locale) {
      setLocaleState(params.locale as LocaleTypes)
    }
  }, [params?.locale, locale])

  const setLocale = (newLocale: LocaleTypes) => {
    setLocaleState(newLocale)
  }

  const contextValue: LocaleContextType = {
    locale,
    setLocale,
  }

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}

// Enhanced useTranslation hook that uses the locale context
export function useLocaleTranslation(namespace: string = 'common') {
  const { locale } = useLocale()
  return useI18nTranslation(locale, namespace)
}
