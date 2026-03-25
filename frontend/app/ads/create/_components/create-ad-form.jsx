'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { scrapeAdUrl } from '../_lib/actions'

const DEBOUNCE_MS = 800

const INITIAL_FORM = {
  url: '',
  adId: '',
  type: '',
  advertiserType: '',
  area: '',
  price: '',
  rooms: '',
  floor: '',
  czynsz: '',
  address: '',
  description: '',
}

function mapScrapedDataToForm(data) {
  return {
    adId: String(data.adId ?? ''),
    type: data.type ?? '',
    advertiserType: data.advertiserType ?? '',
    area: String(data.area ?? ''),
    price: String(data.price ?? ''),
    rooms: String(data.rooms ?? ''),
    floor: String(data.floor ?? ''),
    czynsz: String(data.czynsz ?? ''),
    address: String(data.address ?? ''),
    description: String(data.description ?? ''),
  }
}

function hasFormDetails(form) {
  return Boolean(
    form.adId ||
    form.type ||
    form.advertiserType ||
    form.area ||
    form.price ||
    form.rooms ||
    form.floor ||
    form.czynsz ||
    form.address ||
    form.description,
  )
}

export default function CreateAdForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [isScraping, setIsScraping] = useState(false)
  const [scrapeError, setScrapeError] = useState(null)

  const hasScrapedData = hasFormDetails(form)

  useEffect(() => {
    const trimmedUrl = form.url.trim()

    if (!trimmedUrl) return

    const timeout = setTimeout(async () => {
      setIsScraping(true)

      try {
        const result = await scrapeAdUrl(trimmedUrl)

        if (!result.success) {
          setScrapeError(result.error ?? 'Failed to scrape ad')
          setIsScraping(false)
          return
        }

        setForm(prev => ({
          ...prev,
          ...mapScrapedDataToForm(result.data),
        }))
        setScrapeError(null)
      } catch {
        setScrapeError('Failed to scrape ad')
      } finally {
        setIsScraping(false)
      }
    }, DEBOUNCE_MS)

    return () => clearTimeout(timeout)
  }, [form.url])

  function updateField(name, value) {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleUrlChange(e) {
    const nextUrl = e.target.value

    setForm(prev => {
      if (!nextUrl.trim()) {
        return {
          ...INITIAL_FORM,
          url: nextUrl,
        }
      }

      return {
        ...prev,
        url: nextUrl,
      }
    })

    setScrapeError(null)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(form)
  }

  return (
    <Card className="my-4">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="ad-url">Ad URL</FieldLabel>
              <Input
                type="url"
                id="ad-url"
                name="url"
                placeholder="https://www.otodom.pl/pl/oferta/..."
                value={form.url}
                onChange={handleUrlChange}
                disabled={isScraping}
              />
              {isScraping && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Scraping ad data...
                </p>
              )}
              {scrapeError && (
                <p className="mt-1 text-sm text-destructive">{scrapeError}</p>
              )}
            </Field>

            {hasScrapedData && (
              <>
                <Field>
                  <FieldLabel htmlFor="ad-id">Ad ID</FieldLabel>
                  <Input
                    type="text"
                    id="ad-id"
                    name="adId"
                    value={form.adId}
                    onChange={e => updateField('adId', e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="ad-type">Ad Type</FieldLabel>
                  <Select
                    value={form.type}
                    onValueChange={value => updateField('type', value)}
                  >
                    <SelectTrigger id="ad-type">
                      <SelectValue placeholder="Select ad type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="sale">Sale</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="ad-advertiser-type">
                    Advertiser Type
                  </FieldLabel>
                  <Select
                    value={form.advertiserType}
                    onValueChange={value =>
                      updateField('advertiserType', value)
                    }
                  >
                    <SelectTrigger id="ad-advertiser-type">
                      <SelectValue placeholder="Select advertiser type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="agency">Agency</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="ad-area">Area</FieldLabel>
                  <Input
                    type="number"
                    id="ad-area"
                    name="area"
                    value={form.area}
                    onChange={e => updateField('area', e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="ad-price">Price</FieldLabel>
                  <Input
                    type="number"
                    id="ad-price"
                    name="price"
                    value={form.price}
                    onChange={e => updateField('price', e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="ad-rooms">Rooms</FieldLabel>
                  <Input
                    type="number"
                    id="ad-rooms"
                    name="rooms"
                    value={form.rooms}
                    onChange={e => updateField('rooms', e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="ad-floor">Floor</FieldLabel>
                  <Input
                    type="text"
                    id="ad-floor"
                    name="floor"
                    value={form.floor}
                    onChange={e => updateField('floor', e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="ad-czynsz">Czynsz</FieldLabel>
                  <Input
                    type="number"
                    id="ad-czynsz"
                    name="czynsz"
                    value={form.czynsz}
                    onChange={e => updateField('czynsz', e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="ad-address">Address</FieldLabel>
                  <Input
                    type="text"
                    id="ad-address"
                    name="address"
                    value={form.address}
                    onChange={e => updateField('address', e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="ad-description">Description</FieldLabel>
                  <Textarea
                    id="ad-description"
                    name="description"
                    rows={10}
                    value={form.description}
                    onChange={e => updateField('description', e.target.value)}
                  />
                </Field>

                <Field orientation="horizontal">
                  <Button type="submit" className="w-full">
                    Create ad
                  </Button>
                </Field>
              </>
            )}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
