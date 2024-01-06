import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>The Requested Page is not in our community</p>
      <Link href="/community">Return To Community Page</Link>
    </div>
  )
}