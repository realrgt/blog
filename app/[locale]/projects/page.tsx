import { Metadata } from 'next'
import Project from './project'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import Image from 'next/image'

interface PageProps {
  params: Promise<{
    locale: LocaleTypes
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const { t } = await createTranslation(locale, 'projects')
  return genPageMetadata({
    title: t('title'),
    params: { locale },
  })
}

export default async function Projects({ params }: PageProps) {
  const { locale } = await params
  const { t } = await createTranslation(locale, 'projects')
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
            <div className="relative h-24 w-24 md:h-32 md:w-32">
              <Image
                src="/static/images/gamer.png"
                alt="Projects Profile"
                fill
                className="rounded-full object-contain"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                {t('title')}
              </h1>
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                {t('description')}
              </p>
            </div>
          </div>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            <Project />
          </div>
        </div>
      </div>
    </>
  )
}
