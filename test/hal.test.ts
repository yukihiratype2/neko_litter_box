import { DummyHal } from '../src/hal/dummy_hal';

describe('blah', () => {
  it('works', () => {
    const dummyHal = new DummyHal();
    dummyHal.cat_in();
    expect(dummyHal.weight.value).toBeGreaterThan(10000);
  });
});
