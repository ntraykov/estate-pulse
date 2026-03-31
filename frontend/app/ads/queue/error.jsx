'use client'

export default function ErrorPage({ error }) {
  return (
    <div className="flex flex-col items-center text-red-500 text-2xl">
      <h1>Error fetching ad queue</h1>
      <p>Please try again later</p>
      <p>{error.message}</p>
    </div>
  )
}
