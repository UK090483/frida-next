import { linkMarkQuery } from 'pageBuilder/Blocks/RichText/marks/link'
import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'
import {
  buttonPlugQuery,
  ButtonPlugResult,
} from 'pageBuilder/Blocks/RichText/Plugs/ButtonPlug/ButtonPlug.query'
import {
  downloadPlugQuery,
  DownloadPlugResult,
} from 'pageBuilder/Blocks/RichText/Plugs/DownLoadPlug/DownLoadPlug.query'
import {
  embedPlugQuery,
  EmbedPlugResult,
} from 'pageBuilder/Blocks/RichText/Plugs/EmbedPlug/EmbedPlug.query'
import { imageGalleryPlugQuery } from 'pageBuilder/Blocks/RichText/Plugs/ImageGalleryPlug'
import { imagePlugQuery } from 'pageBuilder/Blocks/RichText/Plugs/ImagePlug'

const marksQuery = `
markDefs[]{
  ...,
  ${linkMarkQuery},
}
`

export const richTextQuery = (locale: string) => `
'content':coalesce(content_${locale},content)[]{
  ...,
  ${marksQuery},
  ${buttonPlugQuery},
  ${embedPlugQuery},
  ${imagePlugQuery},
  ${imageGalleryPlugQuery},
  ${downloadPlugQuery},
}
`

type richtextContent = ButtonPlugResult | DownloadPlugResult | EmbedPlugResult

export interface RichTextQueryResult extends PageBuilderBlockBase {
  _type: 'richText' | 'block'
  content: richtextContent[]
}
