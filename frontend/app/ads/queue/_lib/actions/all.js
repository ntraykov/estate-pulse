'use server'

export default async function all() {
  const response = await fetch(`http://localhost:4000/api/ads/queue`)
  return response.json()
}
