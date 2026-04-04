import AdsList from './_components/AdsList'
import { listAds } from './_lib/list-ads'

export default async function AdsPage() {
  const ads = await listAds()

  return (
    <>
      <div>AdsPage</div>

      <AdsList ads={ads} />
    </>
  )
}
