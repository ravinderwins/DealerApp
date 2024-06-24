import { ConfigApiService } from '@app/base';
import { EncryptionService } from '@app/shared/services';
import { of } from 'rxjs';
import { ShortUrlPipe } from './short-url.pipe';

class ConfigApiServiceMock {
  putWithPlainText(url: string, data: any, useAccessToken: boolean) {
    return of('mocked-shortened-url');
  }
}

class EncryptionServiceMock {
  encodeBase64(value: string) {
    return 'mocked-encoded-url';
  }
}
describe('ShortUrlPipe', () => {
  let pipe: ShortUrlPipe;
  let configApiService: ConfigApiService;
  let encryptionService: EncryptionService;

  beforeEach(() => {
    configApiService = new ConfigApiServiceMock() as ConfigApiService;
    encryptionService = new EncryptionServiceMock() as EncryptionService;
    pipe = new ShortUrlPipe(configApiService, encryptionService);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null when the input value is falsy', async () => {
    const result = await pipe.transform('');
    expect(result).toBeNull();
  });
});
