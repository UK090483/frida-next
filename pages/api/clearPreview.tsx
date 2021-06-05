import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('clear Preview')

  res.clearPreviewData()
  res.status(200).json({ message: 'cleared' })
}
