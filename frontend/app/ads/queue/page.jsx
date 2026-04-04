import AdsQueue from './_components/ads-queue'
import all from './_lib/actions/all'

export default async function QueuePage() {
  const adsQueue = await all()

  return (
    <>
      <h1 className="text-center mb-8 font-bold">Add to the Queue</h1>

      <AdsQueue adsQueue={adsQueue} />
    </>
  )
}
