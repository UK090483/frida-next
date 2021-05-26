// import React from 'react'
// import Components from './Components'

// import ArtistBlock from './Blocks/ArtistsBlock'
// import ArtworksBlock from './Blocks/ArtworkBlock'
// import PostBlock from './Blocks/PostsBlock'
// import ProductsBlock from './Blocks/ProductsBlock'
// import CarouselHeroBlock from './Blocks/CarouselHeroBlock'
// import CategoryBlock from './Blocks/CategoryBlock'
// import Section, { SectionResult } from './Blocks/SectionBlock'
// import RT, { RichTextQueryResult } from './RichText'
// import Marquee, { MarqueeBlockQueryResult } from './Blocks/Marquee'

// import ButtonPlug from './Plugs/ButtonPlug'
// import EmbedPlug, { EmbedPlugResult } from './Plugs/EmbedPlug'
// import ImagePlug from './Plugs/ImagePlug'

// import ComponentNotFound from './component_not_found'
// import { FridaLocation } from 'types'
// import { PageBodyResult } from '@lib/queries/pageBuilderQueries'

// type ContentParserProps = {
//   content: (
//     | MarqueeBlockQueryResult
//     | EmbedPlugResult
//     | SectionResult
//     | RichTextQueryResult
//   )[]
//   lang: FridaLocation
// }

// const BodyParser: React.FC<ContentParserProps> = (props) => {
//   const { content, lang } = props

//   return (
//     <>
//       {content &&
//         content.map((blok) => {
//           switch (blok._type) {
//             case 'marquee':
//               return <Marquee lang={lang} {...blok} />
//             case 'embed':
//               return <EmbedPlug {...blok} />
//             case 'section':
//               return <Section lang={lang} {...blok} />
//             case 'richText':
//               return <RT {...blok} />

//             default:
//               return <ComponentNotFound type={blok._type} />
//           }
//         })}
//     </>
//   )

//   // return (
//   //   <>
//   //     {content &&
//   //       content.map((blok) =>
//   //         React.createElement(Components(blok._type), {
//   //           ...blok,
//   //           lang,
//   //           key: blok._key,
//   //         })
//   //       )}
//   //   </>
//   // )
// }

// export default BodyParser

export {}
