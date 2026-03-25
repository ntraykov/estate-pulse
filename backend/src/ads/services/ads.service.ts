import { CreateAdDto } from '../dto/create-ad.dto';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AdsQueries } from '../queries/ads.queries';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { ScrapedAdDto } from '../dto/scraped-ad.dto';
import { AdvertiserType } from '../enums/advertiser-type.enum';
import { OwnershipType } from '../enums/ownership-type.enum';
import { AdType } from '../enums/ad-type.enum';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';
import { CreateAdProcessingQueueRecordDto } from '../dto/create-ad-processing-queue-record.dto';

@Injectable()
export class AdsService {
  constructor(
    private readonly adsQueries: AdsQueries,
    private readonly httpService: HttpService,
  ) {}

  async createAd(dto: CreateAdDto): Promise<MySqlRawQueryResult> {
    return await this.adsQueries.createAd(dto);
  }

  async findByAdId(adId: number): Promise<boolean> {
    return await this.adsQueries.findByAdId(adId);
  }

  async isAdProcessingQueueUrlAlreadyEnqueued(url: string): Promise<boolean> {
    return await this.adsQueries.findByAdProcessingQueueUrl(url);
  }

  async enqueueAdUrl(dto: CreateAdProcessingQueueRecordDto): Promise<boolean> {
    return await this.adsQueries.enqueueAdUrl(dto);
  }

  async scrapeAdUrl(url: string): Promise<ScrapedAdDto> {
    const { data: html } = await firstValueFrom(
      this.httpService.get<string>(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          Connection: 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        responseType: 'text',
        timeout: 10000,
      }),
    );

    const $ = cheerio.load(html);
    const details = this.parseItemGridContainers($);

    const adId = this.extractAdIdFromUrl(url);
    const price = this.parsePrice(
      $('[aria-label="Cena"]').first().text() || undefined,
    );
    const address = $('[data-sentry-source-file="MapLink.tsx"]')
      .first()
      .text()
      .trim();

    const title = $('h1').first().text().trim();
    const type = /wynajem|do wynajęcia/i.test(title)
      ? AdType.RENT
      : AdType.SALE;

    const advertiserValue = details.get('typ ogłoszeniodawcy')?.toLowerCase();
    const advertiserType = advertiserValue?.includes('biuro')
      ? AdvertiserType.AGENCY
      : AdvertiserType.PRIVATE;

    const ownershipValue = details.get('forma własności')?.toLowerCase();
    const ownershipType =
      ownershipValue?.includes('współ') || ownershipValue?.includes('joint')
        ? OwnershipType.JOINT
        : OwnershipType.FULL;

    return {
      adId,
      url,
      type,
      advertiserType,
      ownershipType,
      area: this.parseNumber(details.get('powierzchnia')) ?? 0,
      price: price ?? 0,
      rooms: this.parseNumber(details.get('liczba pokoi')) ?? 0,
      floor: this.cleanString(details.get('piętro')) || '-',
      czynsz: this.parseNumber(details.get('czynsz')) ?? 0,
      address: this.cleanString(address) || '',
      description:
        this.cleanString($('[data-cy="adPageAdDescription"]').text()) || '',
    };
  }

  private parseItemGridContainers($: cheerio.CheerioAPI): Map<string, string> {
    const map = new Map<string, string>();

    $('[data-sentry-element="ItemGridContainer"]').each((_, el) => {
      const children = $(el).children('div');
      if (children.length >= 2) {
        const label = this.normalizeLabel($(children[0]).text());
        const value = $(children[1]).text().trim();
        if (label) {
          map.set(label, value);
        }
      }
    });

    return map;
  }

  private normalizeLabel(text: string): string {
    return text
      .replace(/:+\s*$/, '')
      .trim()
      .toLowerCase();
  }

  private cleanString(s: string | undefined): string {
    return s?.replace(/\s+/g, ' ').trim() ?? '';
  }

  private extractAdIdFromUrl(url: string): number {
    const match = url.match(/(?:ID|oferta[/-])(\d+)/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  private parsePrice(text: string | undefined): number | undefined {
    if (!text) return undefined;
    const cleaned = text.replace(/\s/g, '').replace(/[^\d,.]/g, '');
    const num = parseFloat(cleaned.replace(',', '.'));
    return Number.isNaN(num) ? undefined : num;
  }

  private parseNumber(text: string | undefined): number | undefined {
    if (!text) return undefined;
    const cleaned = text.replace(/\s/g, '').replace(/[^\d,.]/g, '');
    const num = parseFloat(cleaned.replace(',', '.'));
    return Number.isNaN(num) ? undefined : num;
  }
}
