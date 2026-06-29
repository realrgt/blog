'use client'

import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import experienceData from '@/data/experienceData'
import ScrollReveal from '@/components/animations/ScrollReveal'

export default function Timeline() {
  const locale = useParams()?.locale as LocaleTypes
  const experiences = experienceData[locale] || experienceData.en

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-primary-500/50 via-primary-500/20 to-transparent md:left-1/2 md:block" />

      <div className="space-y-8 md:space-y-12">
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0
          return (
            <ScrollReveal
              key={`${exp.company}-${index}`}
              direction={isLeft ? 'left' : 'right'}
              delay={index * 0.1}
            >
              <div className="relative flex md:justify-center">
                {/* Dot */}
                <div className="absolute left-4 top-6 z-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary-500 bg-white dark:bg-gray-900 md:left-1/2 md:block" />

                {/* Card */}
                <div
                  className={`w-full md:w-[calc(50%-2rem)] ${
                    isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div className="rounded-xl border border-gray-200/60 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:shadow-primary-glow dark:border-gray-700/60 dark:bg-gray-800/80 dark:hover:border-primary-500/30">
                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {exp.role}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</span>
                    </div>
                    <p className="mb-3 font-medium text-primary-500">{exp.company}</p>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}
