'use client'

import siteMetadata from '@/data/siteMetadata'
import Giscus, { Repo } from '@giscus/react'
import { GiscusConfig } from 'pliny/comments'
import { Blog } from 'contentlayer/generated'
import { Theme, useTheme } from '@/components/theme/ThemeContext'

type CommentsProps = {
  post: Blog
  locale: string
}

export default function Comments({ post, locale }: CommentsProps) {
  const { resolvedTheme } = useTheme()
  const { repo, repositoryId, category, categoryId, reactions, metadata, theme, darkTheme } = (
    siteMetadata.comments as GiscusConfig
  ).giscusConfig

  return (
    <div className="flex justify-center rounded-lg p-6">
      {/* Both translations share the slug, so en and pt posts share one discussion. */}
      <Giscus
        id="comments"
        repo={repo as Repo}
        repoId={repositoryId}
        category={category}
        categoryId={categoryId}
        mapping="specific"
        term={post.slug}
        strict="1"
        reactionsEnabled={reactions}
        emitMetadata={metadata}
        inputPosition="top"
        theme={resolvedTheme === Theme.DARK ? darkTheme : theme}
        lang={locale}
        loading="lazy"
      />
    </div>
  )
}
