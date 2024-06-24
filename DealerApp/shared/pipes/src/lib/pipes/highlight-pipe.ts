import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    if (!search) {
      return text;
    }

    const regex = new RegExp(search, 'gi');
    const match = (text || '').match(regex);

    if (!match) {
      return text;
    }
    return text.replace(regex, `<b>${match[0]}</b>`);
  }
}
