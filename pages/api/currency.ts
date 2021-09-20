import { NextApiRequest, NextApiResponse } from 'next'

export interface FridaPreviewData {
  token: string | undefined
}

interface CurrencyData {
  eur: number
  usd: number
  lastUpdated: number
}

let cache: CurrencyData | null

const fetchCurrencyData: () => Promise<CurrencyData | null> = async () => {
  const data = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur,usd'
  )
  if (data.ok) {
    const json = await data.json()
    const { eur, usd } = json.ethereum
    console.log(json)
    if (typeof eur === 'number' && typeof usd === 'number') {
      return { eur, usd, lastUpdated: new Date().getTime() }
    }
  }
  return null
}

const shouldFetch = (cache: CurrencyData | null) => {
  return !cache
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eth = '1' } = req.query
  if (typeof eth !== 'string') {
    return res.status(400).json({ error: 'eth needs to be number' })
  }
  const parsedEth = parseFloat(eth)

  if (shouldFetch(cache)) {
    cache = await fetchCurrencyData()
  }

  if (!cache) {
    return res.status(400).json({ error: 'could not fetch currency' })
  }

  return res
    .status(200)
    .json({ eth, eur: cache.eur * parsedEth, usd: cache.usd * parsedEth })
}
