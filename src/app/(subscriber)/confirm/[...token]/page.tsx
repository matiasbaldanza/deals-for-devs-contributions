import { HiOutlineExclamationCircle as Warning } from 'react-icons/hi'
import { redirect } from 'next/navigation'
import ResendConfirmation from '@/components/subscriber/ResendConfirmation'

import { getXataClient } from '@/xata'
const client = getXataClient()

type ThankYouProps = {
  params: {
    token: string
  }
}

//TODO: Add polling cycling to check email verification status
export default async function ThankYou({ params }: ThankYouProps) {
  const tokenFromParams = params.token
  const baseUrl = process.env.BASE_URL

  if (!tokenFromParams) {
    redirect('/')
  }

  const subscriber = await client.db.subscribers.getFirst({
    filter: { token: tokenFromParams },
  })

  if (!subscriber || !subscriber.email) {
    redirect('/')
  }

  const { email, verified, token } = subscriber

  if (verified) {
    redirect(`/preferences/${token}`)
  }

  //TODO: Add to util function
  const confirmationLink = `${baseUrl}/validate?token=${token}`

  return (
    <main className="-mt-24 flex flex-col items-center text-white">
      {/* email and verified status */}
      <div className="flex items-center justify-center gap-2">
        <span className="underline">{email}</span>
        <div className="flex items-center gap-2 rounded-full bg-[#F9D72238]/[.22] py-1 pl-1 pr-3">
          <Warning className="text-2xl" />
          Unverified
        </div>
      </div>

      {/* call to action */}
      <span className="mb-10 mt-6 text-4xl font-semibold tracking-tight">
        Please Verify Your Email!
      </span>
      <span>
        {`We've`} sent an email to{' '}
        <span className="font-bold underline">{email}</span>.
      </span>
      <span className="mb-12 leading-10">
        Click the link in your email to verify your account
      </span>

      {/* resend confirmation email */}
      <ResendConfirmation email={email} confirmationLink={confirmationLink} />
    </main>
  )
}
