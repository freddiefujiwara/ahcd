const AppleHealthCareData = require('../src/AppleHealthCareData');

describe('AppleHealthCareData', () => {
  let ahcd = undefined;
  beforeEach(() =>{
    ahcd = new AppleHealthCareData(require('fs').readFileSync('__test__/export.xml','utf-8'));
  });
  it(' constructor() : can create new instance', () => {
    expect(ahcd).not.toBeNull();
    expect(ahcd).toBeInstanceOf(AppleHealthCareData);
  });
  it(' analyze() : can output for prompt', () => {
    expect(ahcd.analyze).toBeInstanceOf(Function);
  });
  it(' writeCsvs() : can be a function', () => {
    expect(ahcd.writeCsvs).toBeInstanceOf(Function);
  });
  it(' csv() : can be a function', () => {
    expect(ahcd.csv).toBeInstanceOf(Function);
  });
  it(' keys() : can be a function', () => {
    expect(ahcd.keys).toBeInstanceOf(Function);
  });
});
