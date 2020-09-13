const AppleHealthCareData = require('../src/ahcd');

describe('AppleHealthCareData', () => {
  it(' constructor() : can create new instance', () => {
    const r = new AppleHealthCareData();
    expect(r).not.toBeNull();
    expect(r).toBeInstanceOf(AppleHealthCareData);
  });
  it(' printPrompt() : can output for prompt', () => {
    let buffer = [];
    const r = new AppleHealthCareData((string) => buffer.push(string));
    expect(r.printPrompt).toBeInstanceOf(Function);
    r.printPrompt();
    expect(buffer).toEqual(['db > ']);
    r.printPrompt();
    expect(buffer).toEqual(['db > ','db > ']);
  });
  it(' readInput() : can be a function', () => {
    const r = new AppleHealthCareData();
    expect(r.readInput).toBeInstanceOf(Function);
  });
  it(' run() : can be a function', () => {
    const r = new AppleHealthCareData();
    expect(r.run).toBeInstanceOf(Function);
  });
});
