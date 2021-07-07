//@ts-ignore
import mailchimp from '@mailchimp/mailchimp_marketing'
import type { NextApiRequest, NextApiResponse } from 'next'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
})

export default async function send(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'must be a POST request' })
  }

  const {
    body: { audienceID, email },
  } = req

  // honeypot
  if (req.body.fullName !== '') {
    console.log('stuck in honey')
    return res.status(200).json({ status: 202 })
  }

  if (!email || !audienceID) {
    console.log('no email or audience ID provided')
    return res
      .status(404)
      .json({ error: 'must contain an email address and audience ID' })
  }

  try {
    await mailchimp.lists.addListMember(audienceID, {
      email_address: email,
      status: 'pending',
      tags: ['Newsletter'],
    })
    return res.status(201).json({ error: '' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
