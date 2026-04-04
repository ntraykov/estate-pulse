import { CreateAdDto } from './create-ad.dto';

export interface ScrapeAdResult {
  dto: CreateAdDto;
  /** Remote image URLs in gallery order (deduped). */
  imageUrls: string[];
}
