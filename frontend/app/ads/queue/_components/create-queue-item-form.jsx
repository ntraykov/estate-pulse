'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import create from '../_lib/actions/create'

const form = z.object({
  url: z
    .string()
    .trim()
    .max(500, 'URL is too long')
    .refine(
      val => {
        try {
          const url = new URL(val)
          return url.protocol === 'https:' && url.hostname === 'www.otodom.pl'
        } catch {
          return false
        }
      },
      {
        message: 'URL must be a valid URL and start with https://www.otodom.pl',
      },
    ),
})

export default function CreateQueueItemForm({ adsQueue, setAdsQueue }) {
  const [url, setUrl] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      setButtonDisabled(true)
      return
    }

    setButtonDisabled(false)
  }, [url])

  async function handleSubmit(e) {
    e.preventDefault()

    const validated = form.safeParse({ url })
    if (!validated.success) {
      console.error(validated.error)
      return
    }

    try {
      const response = await create(validated.data.url)
      if (response) {
        setAdsQueue([...adsQueue, response])
        setUrl('')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card className="my-4">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="url">URL</FieldLabel>
              <Input
                type="text"
                id="url"
                name="url"
                placeholder="https://www.otodom.pl/pl/oferta/..."
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
            </Field>

            <Field orientation="horizontal">
              <Button
                type="submit"
                className="w-full"
                disabled={buttonDisabled}
              >
                Enqueue
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
