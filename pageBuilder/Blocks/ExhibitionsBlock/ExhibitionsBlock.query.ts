import { PageBuilderBlockBase } from 'pageBuilder/pageBuilderQueries'
import {
  ExhibitionCardQuery,
  ExhibitionCardResult,
} from 'PageTypes/Exhibition/Exhibition.Card.query'

export const exhibitionsBlockQuery = (locale: string) => `
_type == "exhibitions" => {
  'items':  select(
    type == 'custom' => customItems[]->,
    *[_type == 'exhibition'][0...20]
  )[] | order(startDate) {${ExhibitionCardQuery(locale)}},
}
`
export interface ExhibitionsBlockResult extends PageBuilderBlockBase {
  _type: 'exhibitions'
  items: ExhibitionCardResult[]
}
