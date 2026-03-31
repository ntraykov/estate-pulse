'use client'

import { Card, CardContent } from '@/components/ui/card'

export default function QueueTable({ adsQueue }) {
  if (adsQueue.length === 0) {
    return null
  }

  return (
    <Card className="my-4">
      <CardContent>
        <table className="w-full table-collapse">
          <thead>
            <tr>
              <th>ID</th>
              <th>URL</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {adsQueue.map(item => (
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">
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
                <td className="text-center">{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
