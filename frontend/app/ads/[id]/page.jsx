import Image from 'next/image'
import { getAd } from './_lib/get-ad'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

const hiddenKeys = ['descriptionHtml', 'mainImageUrl']

export default async function AdPage({ params }) {
  const { id } = await params

  const ad = await getAd(id)

  if (!ad) {
    return <div>Ad not found</div>
  }

  return (
    <div>
      <div className="relative w-full h-96 mb-6">
        <Image
          src={ad.images[0].url}
          alt={ad.title || 'Ad image'}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{ad.price} zł</CardTitle>
          <CardDescription className="font-bold">{ad.address}</CardDescription>
        </CardHeader>

        <CardContent>
          <table className="w-full border-collapse table-auto">
            <tbody className="divide-y divide-white/10">
              {Object.entries(ad.rawDetails)
                .filter(([key]) => !hiddenKeys.includes(key))
                .map(([key, value]) => (
                  <tr key={key}>
                    <td className="align-top py-2 pr-4 font-bold whitespace-nowrap">
                      {key}:
                    </td>
                    <td className="align-top py-2 break-words">
                      {value === null || value === undefined
                        ? ''
                        : typeof value === 'object'
                          ? JSON.stringify(value)
                          : String(value)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
