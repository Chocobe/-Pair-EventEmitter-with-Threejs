import EventEmitter from './EventEmitter';

describe('EventEmitter', () => {
  it('constructor()', () => {
    const emitter = new EventEmitter();

    expect(emitter).not.toBeUndefined();
  });
});
