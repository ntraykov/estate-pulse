import { Injectable } from '@nestjs/common';
import { mkdir, readFile, unlink, writeFile } from 'fs/promises';
import { createHash } from 'crypto';
import { dirname, join } from 'path';
import { ScrapeAdResult } from '../dto/scrape-ad-result.dto';
import { AdScraperService } from './ad-scraper.service';
import { AdsQueueQueries } from '../queries/ads-queue.queries';
import { AdsService } from './ads.service';
import { QueueItemDto } from '../dto/queue-item.dto';
import { ProcessedQueueItemDto } from '../dto/processed-queue-item.dto';

@Injectable()
export class AdsProcessorService {
  constructor(
    private readonly adScraperService: AdScraperService,
    private readonly adsService: AdsService,
    private readonly adsQueueQueries: AdsQueueQueries,
  ) {}

  async process(id?: number | null): Promise<ProcessedQueueItemDto | null> {
    const processedItem: ProcessedQueueItemDto | null = id
      ? await this.processById(id)
      : await this.processNext();

    if (processedItem) {
      await this.adsQueueQueries.deleteById(processedItem.queueItemId);
    }

    return processedItem;
  }

  private async processNext(): Promise<ProcessedQueueItemDto | null> {
    const queueItem: QueueItemDto | null = await this.adsQueueQueries.next();

    return queueItem ? await this.processQueueItem(queueItem) : null;
  }

  private async processById(id: number): Promise<ProcessedQueueItemDto | null> {
    const queueItem: QueueItemDto | null =
      await this.adsQueueQueries.findById(id);

    return queueItem ? await this.processQueueItem(queueItem) : null;
  }

  private async processQueueItem(
    queueItem: QueueItemDto,
  ): Promise<ProcessedQueueItemDto | null> {
    const html = await this.downloadAd(queueItem.url);
    const fileName = await this.writeToFile(html, queueItem.url);
    const { dto, imageUrls } = await this.scrapeHtml(fileName);

    const createdAdId: number | null = await this.adsService.create(dto);

    if (createdAdId) {
      await this.adScraperService.persistListingImages(
        imageUrls,
        Number(createdAdId),
        dto.adId,
      );
    }

    await unlink(fileName);

    return createdAdId
      ? new ProcessedQueueItemDto(createdAdId, queueItem.id)
      : null;
  }

  private async scrapeHtml(filename: string): Promise<ScrapeAdResult> {
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

    return join(process.cwd(), 'storage', 'ads', 'unprocessed', `${hash}.html`);
  }
}
