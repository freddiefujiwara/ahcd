const AppleHealthCareData = require('../src/AppleHealthCareData');

describe('AppleHealthCareData', () => {
  it(' constructor() : can create new instance', () => {
    const r = new AppleHealthCareData(require('fs').readFileSync('__test__/export.xml','utf-8'));
    expect(r).not.toBeNull();
    expect(r).toBeInstanceOf(AppleHealthCareData);
  });
  it(' analyze() : can output for prompt', () => {
    let buffer = [];
    const r = new AppleHealthCareData(require('fs').readFileSync('__test__/export.xml','utf-8'));
    expect(r.analyze).toBeInstanceOf(Function);
  });
  it(' writeCsvs() : can be a function', () => {
    const r = new AppleHealthCareData(require('fs').readFileSync('__test__/export.xml','utf-8'));
    expect(r.writeCsvs).toBeInstanceOf(Function);
  });
  it(' csv() : can be a function', () => {
    const r = new AppleHealthCareData(require('fs').readFileSync('__test__/export.xml','utf-8'));
    expect(r.csv).toBeInstanceOf(Function);
  });
});
