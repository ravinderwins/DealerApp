import { Pipe, PipeTransform } from '@angular/core';
import { ConfigApiService, UnprotectedApiEndpoints } from '@app/base';
import { EncryptionService } from '@app/shared/services';
import { firstValueFrom } from 'rxjs';

@Pipe({
  name: 'shortUrl',
})
export class ShortUrlPipe implements PipeTransform {
  constructor(private configApiService: ConfigApiService, private encryptionService: EncryptionService) {}

  async transform(value: string) {
    if (!value) return null;

    const result = await firstValueFrom(this.getShortenLink(value));
    return result;
  }

  private getShortenLink(value: string) {
    const url = UnprotectedApiEndpoints.configs.getShortUrl;
    return this.configApiService.putWithPlainText(url, { base64EncodedUrl: this.encryptionService.encodeBase64(value) }, true);
  }
}
