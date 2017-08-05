import * as api from '../src/api';

describe('api', () => {
  test('has the correct methods', () => {
    expect(api).toEqual(expect.objectContaining({
      getImage: expect.any(Function),
      getRandomImage: expect.any(Function),
    }));
  });
});
