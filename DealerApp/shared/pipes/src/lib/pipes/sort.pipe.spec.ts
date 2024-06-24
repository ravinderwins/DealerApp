import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
  let pipe: SortPipe;

  beforeEach(() => {
    pipe = new SortPipe();
  });

  it('should ...', () => {
    expect(pipe).toBeTruthy();
  });

  it('should check with empty value', () => {
    const result = pipe.transform([], '', 'id');
    expect(result.length).toBe(0);
  });

  it('should check with array value', () => {
    const data = [
      {id: 1, name: 'Jhone'},
      {id: 2, name: 'Bawa'}
    ];
    const result = pipe.transform(data);
    expect(result.length).toBe(0);
  });

  it('should check with array key value', () => {
    const data = [
      {id: 1, name: 'Jhone'},
      {id: 2, name: 'Bawa'}
    ];
    const result = pipe.transform(data, 'asc', 'id');
    expect(result).toEqual(data);
  });
});
