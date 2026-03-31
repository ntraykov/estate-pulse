import { Injectable } from '@nestjs/common';
import { mkdir, readFile, unlink, writeFile } from 'fs/promises';
import { createHash } from 'crypto';
import { dirname, join } from 'path';
import { CreateAdDto } from '../dto/create-ad.dto';
import { AdScraperService } from './ad-scraper.service';
import { AdsQueueQueries } from '../queries/ads-queue.queries';
import { AdsService } from './ads.service';

@Injectable()
export class AdsProcessorService {
  constructor(
    private readonly adScraperService: AdScraperService,
    private readonly adsService: AdsService,
    private readonly adsQueueQueries: AdsQueueQueries,
  ) {}

  async process(): Promise<void> {
    const queueRecord = await this.adsQueueQueries.next();
    if (!queueRecord) {
      return;
    }

    await this.processAd(queueRecord.url);
  }

  private async processAd(url: string): Promise<boolean> {
    const html = await this.downloadAd(url);
    const fileName = await this.writeToFile(html, url);
    const dto = await this.scrapeHtml(fileName);

    const success = await this.adsService.create(dto);
    if (!success) {
      return false;
    }

    await unlink(fileName);

    return true;
  }

  private async scrapeHtml(filename: string): Promise<CreateAdDto> {
    const html = await readFile(filename, 'utf8');

    return this.adScraperService.scrape(html);
  }

  private async writeToFile(html: string, url: string): Promise<string> {
    const fileName = this.buildFileName(url);
    await mkdir(dirname(fileName), { recursive: true });
    await writeFile(fileName, html, 'utf8');

    return fileName;
  }

  private async downloadAd(url: string): Promise<string> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to download ad: ${url}. Status: ${response.status}`,
      );
    }

    return await response.text();
  }

  private buildFileName(url: string): string {
    const hash = createHash('sha256').update(url).digest('hex');

    return join(process.cwd(), 'storage', 'ads', `${hash}.html`);
  }
}
