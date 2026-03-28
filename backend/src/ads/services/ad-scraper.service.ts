import { CreateAdDto } from '../dto/create-ad.dto';
import { Injectable } from '@nestjs/common';

/** Cached regex: first JSON-LD block (attribute order–tolerant). */
const LD_JSON_SCRIPT =
  /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i;

type JsonLdItem = Record<string, unknown>;

@Injectable()
export class AdScraperService {
  scrape(html: string): CreateAdDto {
    const root = this.parseJsonLd(html);
    const graph = root?.['@graph'];
    if (!Array.isArray(graph)) {
      throw new Error('JSON-LD @graph missing or invalid');
    }

    const { webPage, product } = this.pickGraphNodes(graph as JsonLdItem[]);
    if (!product) {
      throw new Error('JSON-LD has no Product node');
    }

    const dto = new CreateAdDto();
    dto.rawHtml = html;
    dto.rawScrapedJson = this.buildRawScrapedJson(root, webPage, product);
    this.applyWebPage(dto, webPage);
    this.applyProduct(dto, product);
    return dto;
  }

  /** Snapshot of scraped JSON-LD for auditing / re-processing. */
  private buildRawScrapedJson(
    root: JsonLdItem,
    webPage: JsonLdItem | undefined,
    product: JsonLdItem,
  ): Record<string, unknown> {
    return {
      source: 'application/ld+json',
      jsonLd: this.jsonClone(root),
      picked: {
        webPage: webPage ? this.jsonClone(webPage) : null,
        product: this.jsonClone(product),
      },
    };
  }

  private jsonClone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }

  private parseJsonLd(html: string): JsonLdItem {
    const m = html.match(LD_JSON_SCRIPT);
    if (!m?.[1]) {
      throw new Error('No application/ld+json script found');
    }
    return JSON.parse(m[1].trim()) as JsonLdItem;
  }

  private pickGraphNodes(graph: JsonLdItem[]): {
    webPage: JsonLdItem | undefined;
    product: JsonLdItem | undefined;
  } {
    let webPage: JsonLdItem | undefined;
    let product: JsonLdItem | undefined;

    for (const item of graph) {
      const types = this.typesOf(item['@type']);
      if (types.includes('Product')) {
        product = item;
      }
      if (types.includes('WebPage')) {
        if (!webPage) {
          webPage = item;
        } else {
          const name = String((item as { name?: string }).name ?? '');
          if (
            /\d{6,}/.test(name) &&
            (name.includes('sprzedaż') || name.includes('wynajem'))
          ) {
            webPage = item;
          }
        }
      }
    }

    return { webPage, product };
  }

  private typesOf(raw: unknown): string[] {
    if (raw == null) {
      return [];
    }
    if (Array.isArray(raw)) {
      return raw
        .map((t) => {
          if (typeof t === 'string') {
            return t;
          }
          if (typeof t === 'number' || typeof t === 'boolean') {
            return String(t);
          }
          return '';
        })
        .filter((s) => s.length > 0);
    }
    if (typeof raw === 'string') {
      return [raw];
    }
    if (typeof raw === 'number' || typeof raw === 'boolean') {
      return [String(raw)];
    }
    return [];
  }

  private applyWebPage(
    dto: CreateAdDto,
    webPage: JsonLdItem | undefined,
  ): void {
    if (!webPage) {
      return;
    }
    const name = String((webPage as { name?: string }).name ?? '');
    const idMatch = name.match(/(\d{6,})/);
    if (idMatch) {
      dto.adId = idMatch[1];
    }
    const lower = name.toLowerCase();
    if (lower.includes('sprzedaż')) {
      dto.adType = 'sale';
    } else if (lower.includes('wynajem')) {
      dto.adType = 'rent';
    }
  }

  private applyProduct(dto: CreateAdDto, product: JsonLdItem): void {
    const p = product as {
      name?: string;
      headline?: string;
      url?: string;
      description?: string;
      image?: unknown;
      address?: {
        streetAddress?: string;
        addressLocality?: string;
        addressRegion?: string;
      };
      geo?: { latitude?: number; longitude?: number };
      numberOfRooms?: number;
      offers?: { price?: number } | { price?: number }[];
      additionalProperty?: Array<{ name?: string; value?: unknown }>;
      '@type'?: string | string[];
    };

    if (p.url) {
      dto.url = p.url;
    }

    const types = this.typesOf(p['@type']);
    if (types.length >= 2) {
      dto.propertyType = this.normalizePropertyType(String(types[1]));
    }

    const details: Record<string, unknown> = {};
    const title = (p.headline ?? p.name ?? '').trim();
    if (title) {
      details.title = title;
    }
    const description = this.stripHtml(String(p.description ?? ''));
    if (description) {
      details.description = description;
    }
    if (typeof p.description === 'string' && p.description.length > 0) {
      details.descriptionHtml = p.description;
    }

    if (p.address) {
      const { streetAddress, addressLocality, addressRegion } = p.address;
      const parts = [streetAddress, addressLocality, addressRegion].filter(
        Boolean,
      );
      dto.address = parts.join('; ');
      if (addressLocality) {
        dto.settlement = addressLocality;
      }
    }

    if (p.geo) {
      if (typeof p.geo.latitude === 'number') {
        dto.latitude = p.geo.latitude;
      }
      if (typeof p.geo.longitude === 'number') {
        dto.longitude = p.geo.longitude;
      }
    }

    const mainImage = this.firstImageUrl(p.image);
    if (mainImage) {
      details.mainImageUrl = mainImage;
    }

    const offers = p.offers;
    const offer = Array.isArray(offers) ? offers[0] : offers;
    if (offer && typeof offer.price === 'number') {
      dto.price = offer.price;
    }

    if (typeof p.numberOfRooms === 'number') {
      dto.rooms = p.numberOfRooms;
    }

    const props = this.indexAdditionalProperties(p.additionalProperty);
    this.applyAdditionalProperty(dto, props, details);

    if (dto.rooms === undefined && props.has('Liczba pokoi')) {
      const n = this.parseLeadingNumber(props.get('Liczba pokoi')!);
      if (n !== undefined) {
        dto.rooms = Math.round(n);
      }
    }

    if (p.additionalProperty?.length) {
      details.additionalProperty = this.jsonClone(p.additionalProperty);
    }

    dto.rawDetailsJson = details;
  }

  /** Maps schema.org type to values that fit `CreateAdDto.propertyType` (max 50). */
  private normalizePropertyType(raw: string): string {
    const r = raw.toLowerCase().trim();
    const normalized = r.includes('house') ? 'house' : 'apartment';
    return normalized.length <= 50 ? normalized : normalized.slice(0, 50);
  }

  private applyAdditionalProperty(
    dto: CreateAdDto,
    props: Map<string, string>,
    details: Record<string, unknown>,
  ): void {
    const areaRaw = props.get('Powierzchnia');
    if (areaRaw !== undefined) {
      const n = this.parseLeadingNumber(areaRaw);
      if (n !== undefined) {
        dto.area = n;
      }
    }

    const floor = props.get('Piętro');
    if (floor !== undefined) {
      details.floor = floor.trim();
    }

    const czynszRaw = props.get('Czynsz');
    if (czynszRaw !== undefined) {
      const n = this.parseLeadingNumber(czynszRaw);
      if (n !== undefined) {
        details.czynsz = n;
      }
    }

    const yearRaw = props.get('Rok budowy');
    if (yearRaw !== undefined) {
      const n = this.parseLeadingNumber(yearRaw);
      if (n !== undefined) {
        details.constructionYear = Math.round(n);
      }
    }

    const bt = props.get('Rodzaj zabudowy');
    if (bt) {
      details.buildingType = bt.trim();
    }

    const bm = props.get('Materiał budynku');
    if (bm) {
      details.buildingMaterial = bm.trim();
    }

    const elev = props.get('Winda');
    if (elev !== undefined) {
      details.elevator = this.parsePolishYesNo(elev);
    }
  }

  private indexAdditionalProperties(
    rows: Array<{ name?: string; value?: unknown }> | undefined,
  ): Map<string, string> {
    const map = new Map<string, string>();
    if (!rows) {
      return map;
    }
    for (const row of rows) {
      const key = row.name?.trim();
      if (!key) {
        continue;
      }
      map.set(key, this.additionalValueToString(row.value));
    }
    return map;
  }

  private additionalValueToString(value: unknown): string {
    if (value == null) {
      return '';
    }
    if (typeof value === 'string') {
      return value.trim();
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    return '';
  }

  /** Polish listing values: "54 m²", "245 zł", "1914", "2 " */
  private parseLeadingNumber(raw: string): number | undefined {
    const m = raw.replace(/\u00a0/g, ' ').match(/[\d\s]+[,.]?[\d]*/);
    if (!m) {
      return undefined;
    }
    const compact = m[0].replace(/\s/g, '').replace(',', '.');
    const n = parseFloat(compact);
    return Number.isFinite(n) ? n : undefined;
  }

  private parsePolishYesNo(raw: string): boolean {
    const s = raw.trim().toLowerCase();
    if (s === 'tak' || s === 'yes') {
      return true;
    }
    if (s === 'nie' || s === 'no') {
      return false;
    }
    return /^(tak|yes|1|true)/i.test(raw.trim());
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private firstImageUrl(image: unknown): string | undefined {
    if (typeof image === 'string') {
      return image;
    }
    if (Array.isArray(image)) {
      return this.firstImageUrl(image[0]);
    }
    if (image && typeof image === 'object' && 'url' in image) {
      const u = (image as { url?: unknown }).url;
      return typeof u === 'string' ? u : undefined;
    }
    return undefined;
  }
}
