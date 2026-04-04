import AdsListItem from './AdsListItem'

export default function AdsList({ ads }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {ads.map(ad => (
        <AdsListItem key={ad.id} ad={ad} />
      ))}
    </div>
  )
}
