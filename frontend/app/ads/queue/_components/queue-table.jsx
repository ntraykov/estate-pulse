'use client'

import { Card, CardContent } from '@/components/ui/card'

export default function QueueTable({ adsQueue }) {
  if (adsQueue.length === 0) {
    return null
  }

  return (
    <Card className="my-4">
      <CardContent>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">URL</th>
              <th className="px-4 py-2">Created At</th>
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
                <td className="text-center px-4 py-2">{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
