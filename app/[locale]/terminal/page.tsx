import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import Terminal from '@/components/terminal/Terminal'

interface TerminalPageProps {
  params: Promise<{ locale: LocaleTypes }>
}

export default async function TerminalPage({ params }: TerminalPageProps) {
  const { locale } = await params
  const { t } = await createTranslation(locale, 'terminal')

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-heading-400 dark:text-heading-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('title')}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('subtitle')}</p>
      </div>
      <div className="pt-8">
        <Terminal />
      </div>
    </div>
  )
}
