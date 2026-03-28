import { Injectable } from '@nestjs/common';
import { AdsProcessingQueueQueries } from '../queries/ads-processing-queue.queries';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { createHash } from 'crypto';
import { dirname, join } from 'path';
import { CreateAdDto } from '../dto/create-ad.dto';
import { AdScraperService } from './ad-scraper.service';
import { AdsQueries } from '../queries/ads.queries';

@Injectable()
export class AdsProcessorService {
  constructor(
    private readonly adScraperService: AdScraperService,
    private readonly adsQueries: AdsQueries,
    private readonly adsProcessingQueueQueries: AdsProcessingQueueQueries,
  ) {}

  async process(): Promise<void> {
    await this.processAd();
    // const queueRecords = await this.adsProcessingQueueQueries.all();

    // for (const queueRecord of queueRecords) {
    //   await this.processAd(queueRecord.url);
    // }
  }

  private async processAd(): Promise<void> {
    // const html = await this.downloadAd(url);
    // await this.writeToFile(html, url);
    const dto = await this.scrapeHtml(
      join(process.cwd(), 'storage', 'ads', '123.html'),
    );

    await this.adsQueries.createAd(dto);
  }

  private async scrapeHtml(filename: string): Promise<CreateAdDto> {
    const html = await readFile(filename, 'utf8');

    return this.adScraperService.scrape(html);
  }

  private async writeToFile(html: string, url: string): Promise<void> {
    const fileName = this.buildFileName(url);
    await mkdir(dirname(fileName), { recursive: true });
    await writeFile(fileName, html, 'utf8');
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
