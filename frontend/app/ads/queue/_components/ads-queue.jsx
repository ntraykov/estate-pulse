'use client'

import CreateQueueItemForm from './create-queue-item-form'
import QueueTable from './queue-table'
import { useState } from 'react'

export default function AdsQueue(props) {
  const [adsQueue, setAdsQueue] = useState(props.adsQueue)

  return (
    <>
      <CreateQueueItemForm adsQueue={adsQueue} setAdsQueue={setAdsQueue} />

      <QueueTable adsQueue={adsQueue} />
    </>
  )
}
