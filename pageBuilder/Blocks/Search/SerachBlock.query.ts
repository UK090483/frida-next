import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'

import { FridaColors } from 'types'

export interface SearchBlockResult extends PageBuilderBlockBase {
  _type: 'search'
  bgColor: FridaColors
}
