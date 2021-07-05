import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('clear Preview')
  res.clearPreviewData()
  res.writeHead(307, { Location: '/' })
  res.end()
}
