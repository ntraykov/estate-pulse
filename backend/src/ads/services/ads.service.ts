import { CreateAdDto } from '../dto/create-ad.dto';
import { Injectable } from '@nestjs/common';
import { AdsQueries } from '../queries/ads.queries';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import * as cheerio from 'cheerio';
import { CreateAdProcessingQueueRecordDto } from '../dto/create-ad-processing-queue-record.dto';
import { AdsProcessingQueueQueries } from '../queries/ads-processing-queue.queries';

@Injectable()
export class AdsService {
  constructor(
    private readonly adsQueries: AdsQueries,
    private readonly adsProcessingQueueQueries: AdsProcessingQueueQueries,
  ) {}

  // async createAd(dto: CreateAdDto): Promise<MySqlRawQueryResult> {
  //   return await this.adsQueries.createAd(dto);
  // }

  async isAdProcessingQueueUrlAlreadyEnqueued(url: string): Promise<boolean> {
    return await this.adsProcessingQueueQueries.findByAdProcessingQueueUrl(url);
  }

  async enqueueAdUrl(dto: CreateAdProcessingQueueRecordDto): Promise<boolean> {
    return await this.adsProcessingQueueQueries.enqueueAdUrl(dto);
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
