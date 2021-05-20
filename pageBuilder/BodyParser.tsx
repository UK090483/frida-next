import React from 'react'
import Components from './Components'

type ContentParserProps = {
  content: { _type: string; _key: string }[]
  lang: string
}
const ContentParser: React.FC<ContentParserProps> = (props) => {
  const { content, lang } = props

  return (
    <>
      {content &&
        content.map((blok) =>
          React.createElement(Components(blok._type), {
            ...blok,
            lang,
            key: blok._key,
          })
        )}
    </>
  )
}

export default ContentParser
