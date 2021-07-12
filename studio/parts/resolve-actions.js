import defaultResolve, {
  PublishAction,
  DiscardChangesAction,
  UnpublishAction,
  DuplicateAction,
  DeleteAction,
} from 'part:@sanity/base/document-actions'

import { FiEye } from 'react-icons/fi'
import { defaultFooterId } from '../../shared'

const remoteURL = window.location.protocol + '//' + window.location.hostname
const localURL = 'http://localhost:3000'
const previewURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

const singletons = [
  'homePage',
  'shopPage',
  'errorPage',
  'generalSettings',
  'cookieSettings',
  'promoSettings',
  'headerSettings',
  'footerSettings',
  'cartSettings',
   'seoSettings'
]

const singletonsID = [defaultFooterId]

const editAndDelete = ['product', 'productVariant']

const previews = ['homePage', 'shopPage', 'page', 'product', 'collection']

const PreviewAction = props => {
  const slug = props.draft
    ? props.draft.slug?.current
    : props.published?.slug?.current
  return {
    label: 'Open Preview',
    icon: FiEye,
    onHandle: () => {
      window.open(
        `${previewURL}/api/preview?token=HULL&type=${props.type}&slug=${slug ||
          ''}`
      )
    }
  }
}

export default function resolveDocumentActions(props) {
  const isSingle = singletons.indexOf(props.type) > -1
  const canEditDelete = editAndDelete.indexOf(props.type) > -1
  const canPreview = previews.indexOf(props.type) > -1
  const isSingleID = singletonsID.indexOf(props.id) > -1
  

  // if(props.type === 'artwork'){
  
  //   return [
  //     PublishAction,
  //     DiscardChangesAction,
  //     UnpublishAction,
  //     DuplicateAction,
  //     ...(props.published ?[]: [DeleteAction]),
  //   ]
  // }

  
  if (isSingleID) {
    return [
      PublishAction,
      DiscardChangesAction,
      ...(canPreview ? [PreviewAction] : [])
    ]
  }

  if (isSingle) {
    return [
      PublishAction,
      DiscardChangesAction,
      ...(canPreview ? [PreviewAction] : [])
    ]
  }

  if (canEditDelete) {
    return [
      PublishAction,
      DiscardChangesAction,
      DeleteAction,
      ...(canPreview ? [PreviewAction] : [])
    ]
  }
  
  return [...defaultResolve(props), ...(canPreview ? [PreviewAction] : [])]
}
