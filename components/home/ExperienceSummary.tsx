'use client'

import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import experienceData from '@/data/experienceData'
import Link from '@/components/mdxcomponents/Link'
import ScrollReveal from '@/components/animations/ScrollReveal'

export default function ExperienceSummary() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'experience')
  const experiences = (experienceData[locale] || experienceData.en).slice(0, 3)

  return (
    <section className="py-8">
      <ScrollReveal>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {t('title')}
        </h2>
      </ScrollReveal>
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <ScrollReveal key={`${exp.company}-${index}`} delay={index * 0.1}>
            <div className="rounded-xl border border-gray-200/60 bg-white/80 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:shadow-primary-glow dark:border-gray-700/60 dark:bg-gray-800/80 dark:hover:border-primary-500/30">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">{exp.role}</h3>
                  <p className="text-sm font-medium text-primary-500">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {exp.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <div className="mt-4 text-right">
        <Link
          href={`/${locale}/experience`}
          className="text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
          {t('seeAll')} &rarr;
        </Link>
      </div>
    </section>
  )
}
