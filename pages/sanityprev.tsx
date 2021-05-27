//@ts-nocheck
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Page from 'contentTypes/Page/Page'

import { page as pageQuery } from '@lib/queries/pageQueries'

import PostSingle from 'contentTypes/Post/PostSingle'

const sanityClient = require('@sanity/client')
const clientForPreview = sanityClient({
  projectId: 'ypuaahj7',
  dataset: 'test2',
  useCdn: false,
  withCredentials: true,
  apiVersion: '2021-03-25',
})

const getQuery = (type) => {
  switch (type) {
    case 'page':
      return pageQuery

    case 'indexPage':
      return pageQuery
    case 'post':
      return postQuery

    default:
      return '...'
  }
}

export default function Pages() {
  const router = useRouter()

  const { id, type } = router.query
  const [data, setData] = useState(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    const query = `*[_id == "${id}"][0]{
      ${getQuery(type)}
    }`
    clientForPreview.fetch(query, {}).then((page) => {
      setData(page)
    })

    const subscription = clientForPreview
      .listen(query, {})
      .subscribe((page: any) => {
        setVersion((oldVersion) => oldVersion + 1)
      })
    return () => {
      subscription.unsubscribe()
    }
  }, [id, version, setData, setVersion])

  // console.log(data ? data : 'waiting...')

  if (!data) return <div>prev</div>

  const getPrevComponent = () => {
    switch (type) {
      case 'page':
        return <Page lang="de" data={data} />
      case 'indexPage':
        return <Page lang="de" data={data} />
      case 'post':
        return <PostSingle lang="de" {...data} />

      default:
        return <div>No PreviewComponent Found</div>
    }
  }
  return <React.Fragment>{data && getPrevComponent()}</React.Fragment>

  return <div>prev</div>
}
