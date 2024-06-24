import { HighlightPipe } from './highlight-pipe';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;

  beforeEach(() => {
    pipe = new HighlightPipe();
  });

  it('should ...', () => {
    expect(pipe).toBeTruthy();
  });

  it('should check with empty search value', () => {
    expect(pipe.transform('Test', '')).toBe('Test');
  });
  it('should check with same values', () => {
    const val = 'Hilight Pipe';
    const result = pipe.transform(val, val);
    expect(result).toBe(`<b>${val}</b>`);
  });
  it('should check with values', () => {
    const result = pipe.transform('Test', 'Hilight Pipe');
    expect(result).toBe('Test');
  });

});
