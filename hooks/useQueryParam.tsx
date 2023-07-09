import { NextRouter } from 'next/router'
import { useCallback } from 'react'

export type useQueryParamProps = {
  router: NextRouter
  ignore?: string[]
}

const useQueryParam = (props: useQueryParamProps) => {
  const { router, ignore } = props

  const getParam = useCallback(
    (name: string) => {
      return router.query[name]?.toString()
    },
    [router]
  )
  const setParam = useCallback(
    (name: string, value: string | null | undefined) => {
      const nextQueries = {
        ...router.query,
        [name]: value,
      }

      if (value) {
        nextQueries[name] = value
      }

      if (!value) {
        delete nextQueries[name]
      }

      if (ignore) {
        ignore.forEach((i) => {
          delete nextQueries[i]
        })
      }

      const pathname = router.asPath.split('?')[0]
      router.push({ pathname, query: nextQueries }, undefined, {
        shallow: true,
      })
    },
    [router, ignore]
  )

  return {
    getParam,
    setParam,
  }
}

export default useQueryParam
