import Image from 'next/image'
import Link from 'next/link'

export default function AdsListItem({ ad }) {
  return (
    <Link
      href={`/ads/${ad.id}`}
      className="border border-border-strong rounded-md flex gap-6 hover:border-accent-foreground transition-colors"
      prefetch={false}
    >
      <Image
        src={ad.mainImageUrl}
        alt={ad.title}
        width={200}
        height={200}
        className="rounded-l-md"
      />

      <div className="flex flex-col py-4 gap-4">
        <h2 className="text-2xl font-bold">{ad.price} zł</h2>

        <div>
          <div className="font-bold">{ad.settlement}</div>
          <p>{ad.address}</p>
        </div>

        <p className="text-sm text-secondary-foreground">
          {ad.rooms} pokoje | {ad.area} m²
        </p>
      </div>
    </Link>
  )
}
