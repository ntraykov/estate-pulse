import AdsQueue from './_components/ads-queue'
import CreateQueueItemForm from './_components/create-queue-item-form'
import QueueTable from './_components/queue-table'
import all from './_lib/actions/all'

export default async function QueuePage() {
  const adsQueue = await all()

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-6xl text-center text-gray-800 mb-8 font-bold">
        Enqueue new ad listing
      </h1>

      <AdsQueue adsQueue={adsQueue} />
    </div>
  )
}
