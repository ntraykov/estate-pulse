'use server'

export default async function create(url) {
  const response = await fetch('http://localhost:4000/api/ads/queue', {
    method: 'POST',
    body: JSON.stringify({ url }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}
