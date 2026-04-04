export async function getAd(id) {
  const response = await fetch(`http://localhost:4000/api/ads/${id}`)
  return response.json()
}
