'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { ModeToggle } from '../web/ui/ModeToggle'

export default function Navbar() {
  return (
    <div className="w-full border-b border-border py-4 mb-12 bg-background">
      <div className="flex justify-between items-center px-8 mx-auto">
        <Link href="/">
          <h1 className="text-4xl font-bold">Estate Pulse</h1>
        </Link>

        <div className="flex items-center gap-3">
          <ModeToggle />

          <Link href="/ads/create">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Create new ad
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
