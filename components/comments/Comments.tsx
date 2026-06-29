'use client'

import siteMetadata from '@/data/siteMetadata'
import Giscus from '@giscus/react'
import { Blog } from 'contentlayer/generated'

type CommentsProps = {
  post: Blog
  locale: string
}

export default function Comments({ post, locale }: CommentsProps) {
  return (
    <div className="flex justify-center rounded-lg bg-gray-900 p-6 dark:bg-none">
      <Giscus
        id="comments"
        repo="realrgt/portfolio"
        repoId="1048676460"
        category="Posts"
        mapping="specific"
        term={post.title}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={siteMetadata.theme}
        lang={locale}
        loading="lazy"
      />
    </div>
  )
}
