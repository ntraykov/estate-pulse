'use server'

export async function listAds() {
  const response = await fetch('http://localhost:4000/api/ads')
  return response.json()
}
