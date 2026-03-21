import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getHello(): Promise<string> {
    const filePath =
      '/home/ntraykov/Desktop/Presentation/3 pokoje, mieszkanie na sprzedaż - Lubin, lubiński, dolnośląskie - 67777651 • www.otodom.pl.html';
    // console.log(filePath);
    const html = await fs.readFile(filePath, 'utf8');
    // const url = 'https://www.otodom.pl/pl/oferta/twoj-wymarzony-dom-w-zgorzelcu-spokoj-komfort-i-potencjal-ID4zBI0';

    const $ = cheerio.load(html);
    const price = $('[aria-label="Cena"]');
    const address = $('[data-sentry-source-file="MapLink.tsx"]').first().text();
    console.log('Address: ', address);
    console.log('Price: ', price.text());
    const adHistory = $('[data-sentry-component="AdHistoryBase"]').find(
      'tbody tr',
    );
    for (let i = 0; i < adHistory.length; i++) {
      const row = $(adHistory).eq(i);
      console.log(
        row.find('td').eq(1).text(),
        row.find('td').eq(0).text(),
        row.find('td').eq(2).text(),
      );
    }
    const details = $('[data-sentry-element="ItemGridContainer"]');
    for (let i = 0; i < details.length; i++) {
      const children = $(details[i]).children();
      console.log(children.first().text(), children.last().text());
    }

    return '';
  }
}
