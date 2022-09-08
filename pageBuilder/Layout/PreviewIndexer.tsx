import { useRouter } from 'next/router'
import React from 'react'

const PreviewIndexer: React.FC = () => {
  const { isPreview } = useRouter()
  if (!isPreview) return null
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      className="fixed p-3 rounded-md left-2 bottom-2 border-frida-red border-3 "
      href="/api/clearPreview"
    >
      Exit Preview
    </a>
  )
}

export default PreviewIndexer
