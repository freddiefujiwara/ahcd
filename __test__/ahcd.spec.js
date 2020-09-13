const AppleHealthCareData = require('../src/ahcd');

describe('AppleHealthCareData', () => {
  it(' constructor() : can create new instance', () => {
    const r = new AppleHealthCareData();
    expect(r).not.toBeNull();
    expect(r).toBeInstanceOf(AppleHealthCareData);
  });
});
