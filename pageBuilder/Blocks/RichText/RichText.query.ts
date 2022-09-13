import { linkMarkQuery } from 'pageBuilder/marks/link'
import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'
import { buttonPlugQuery } from 'pageBuilder/Plugs/ButtonPlug'
import { downloadPlugQuery } from 'pageBuilder/Plugs/DownLoadPlug'
import { embedPlugQuery } from 'pageBuilder/Plugs/EmbedPlug'
import { imageGalleryPlugQuery } from 'pageBuilder/Plugs/ImageGaleriePlug'
import { imagePlugQuery } from 'pageBuilder/Plugs/ImagePlug'
import { innerSectionPlugQuery } from 'pageBuilder/Plugs/innerSection'

const marksQuery = `
markDefs[]{
  ...,
  ${linkMarkQuery},
}
`

export const richTextQuery= (locale:string) => `
'content':coalesce(content_${locale},content)[]{
  ...,
  ${marksQuery},
  ${buttonPlugQuery},
  ${embedPlugQuery},
  ${imagePlugQuery},
  ${imageGalleryPlugQuery},
  ${innerSectionPlugQuery},
  ${downloadPlugQuery},
}
`

export interface RichTextQueryResult extends PageBuilderBlockBase {
  _type: 'richText' | 'block'
  content: any[]
}
