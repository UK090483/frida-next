//@ts-nocheck
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// import * as queryString from 'query-string'
import Page from '../pageBuilder/Page'

import { page as pageQuery } from '@lib/queries/pageQueries'
import { createPreviewClient } from '@lib/sanity'

const sanityClient = require('@sanity/client')
const clientForPreview = sanityClient({
  projectId: 'ypuaahj7',
  dataset: 'test2',
  useCdn: false,
  withCredentials: true,
  apiVersion: '2021-03-25',
})

export default function Pages() {
  const router = useRouter()

  const { id, type } = router.query
  const [data, setData] = useState(null)

  useEffect(() => {
    const query = `*[_id == "${id}"][0]{
      ${pageQuery}
    }`
    clientForPreview.fetch(query, {}).then((page) => {
      // console.log(page)
      setData(page)
    })
    const subscription = clientForPreview
      .listen(query, {})
      .subscribe((page: any) => {
        // console.log(page)
        setData((oldData) => ({ ...oldData, ...page.result }))
      })
    return () => {
      subscription.unsubscribe()
    }
  }, [id, setData])

  console.log(data)

  // console.log(data ? data : 'waiting...')

  if (!data) return <div>prev</div>

  const getPrevComponent = () => {
    switch (type) {
      case 'page':
        return <Page lang="de" data={data} />
      case 'indexPage':
        return <Page lang="de" data={data} />

      default:
        return <div>No PreviewComponent Found</div>
    }
  }
  return <React.Fragment>{data && getPrevComponent()}</React.Fragment>

  return <div>prev</div>
}
