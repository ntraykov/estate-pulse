'use server'

export default async function process(id) {
  const response = await fetch(`http://localhost:4000/api/ads/queue/${id}`, {
    method: 'POST',
  })

  return response.json()
}
