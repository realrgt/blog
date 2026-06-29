import React from 'react'
import Image from 'next/image'

interface LayoutHeaderProps {
  title: string
  description?: string
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({ title, description }) => {
  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <div className="relative h-24 w-24 md:h-32 md:w-32">
          <Image
            src="/static/images/reader.png"
            alt="Profile"
            fill
            className="rounded-full object-contain"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-heading-400 dark:text-heading-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h2>
          {description && (
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default LayoutHeader
