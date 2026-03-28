import { Command, CommandRunner } from 'nest-commander';
import { AdsProcessorService } from '../../services/ads-processor.service';
import { join } from 'path';

@Command({ name: 'process-ads' })
export class ProcessAdsCommand extends CommandRunner {
  constructor(private readonly adsProcessorService: AdsProcessorService) {
    super();
  }

  async run(passedParams: string[]): Promise<void> {
    await this.adsProcessorService.process();
  }
}
