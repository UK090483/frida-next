import { NextApiRequest, NextApiResponse } from 'next'

import https from 'https'
import path from 'path'

export interface FridaPreviewData {
  token: string | undefined
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = req.query.path
  if (!filePath || typeof filePath !== 'string') {
    return res.status(401).json({ message: 'Invalid preview request' })
  }

  const fileName = path.parse(filePath).base
  res.setHeader('content-disposition', 'attachment; filename=' + fileName)
  const send = new Promise((resolve, reject) => {
    https.get(filePath, async (response) => {
      response.pipe(res)
      response.on('error', async function () {
        reject()
        return res.status(500).json({ message: 'Invalid preview request' })
      })
      response.on('end', async function () {
        resolve(true)
      })
    })
  })
  await send
}
export default handler
