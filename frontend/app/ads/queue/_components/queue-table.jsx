'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PlayIcon, TrashIcon } from 'lucide-react'
import process from '../_lib/actions/process'

function formatDate(dateStr) {
  const date = new Date(dateStr)

  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')

  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}, ${hours}:${minutes}`
}

export default function QueueTable({ adsQueue, setAdsQueue }) {
  if (adsQueue.length === 0) {
    return null
  }

  async function handlePlay(id) {
    try {
      await process(id)
      setAdsQueue(adsQueue.filter(item => item.id !== id))
    } catch (error) {
      toast.error('Failed to process ad')
    }
  }

  return (
    <Card className="my-4">
      <CardContent>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">URL</th>
              <th className="px-4 py-2">Added At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adsQueue.map(item => (
              <tr key={item.id}>
                <td className="text-center px-4 py-2">{item.id}</td>
                <td className="text-center px-4 py-2">
                  <a
                    className="hover:underline"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.url.length > 50
                      ? item.url.slice(0, 50) + '…'
                      : item.url}
                  </a>
                </td>
                <td className="text-center px-4 py-2">
                  {formatDate(item.createdAt)}
                </td>
                <td className="text-center px-4 py-2 flex flex-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePlay(item.id)}
                  >
                    <PlayIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrashIcon className="w-4 h-4 text-danger" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
