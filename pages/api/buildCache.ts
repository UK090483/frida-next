import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.rawHeaders[1])
  return res.status(200).json({ message: 'we are getting there' })
}
