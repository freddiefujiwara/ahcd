const AppleHealthCareData = require('../src/AppleHealthCareData');

describe('AppleHealthCareData', () => {
  let ahcd = undefined;
  beforeEach(() =>{
    ahcd = new AppleHealthCareData(require('fs').readFileSync('__test__/export.xml','utf-8'));
  });
  it(' constructor() : can create new instance', () => {
    expect(ahcd).not.toBeNull();
    expect(ahcd).toBeInstanceOf(AppleHealthCareData);
    expect(ahcd.nodes).toBeInstanceOf(Array);
    expect(ahcd.results).toBeInstanceOf(Object);
    expect(ahcd.results).toEqual({});
    expect(ahcd.csvs).toBeInstanceOf(Object);
    expect(ahcd.csvs).toEqual({});
    expect(ahcd.nodes.length).toEqual(12);
  });
  it(' analyze() : can analyze this.nodes then create this.results', () => {
    expect(ahcd.analyze).toBeInstanceOf(Function);
    expect(ahcd.analyze()).toBeInstanceOf(AppleHealthCareData);
    const expected = {
      HeartRate: {header:7,records:1},
      BodyMassIndex: {header:7,records:2},
      BloodPressureSystolic: {header:7,records:6},
    };
    Object.keys(expected).forEach((k) => {
      expect(ahcd.results[k].header.length).toEqual(expected[k].header);
      expect(ahcd.results[k].records.length).toEqual(expected[k].records);
    });
  });
  it(' writeCsvs() : can write from this.results to fill out this.csvs', () => {
    ahcd.analyze();
    expect(ahcd.writeCsvs).toBeInstanceOf(Function);
    expect(ahcd.writeCsvs()).toBeInstanceOf(AppleHealthCareData);
    const expected = {
      HeartRate: 3,
      BodyMassIndex: 4,
      BloodPressureSystolic: 8
    };
    Object.keys(expected).forEach((k) => {
      expect(ahcd.csvs[k].split("\n").length).toEqual(expected[k]);
    });
  });
  it(' csv(key) : can extract this.csvs[key]', () => {
    ahcd.analyze().writeCsvs();
    expect(ahcd.csv).toBeInstanceOf(Function);
    expect(ahcd.csv('HeatRate')).toBeUndefined();
    expect(ahcd.csv('HeartRate')).not.toBeUndefined();
  });
  it(' keys() : can return all keys', () => {
    ahcd.analyze().writeCsvs();
    expect(ahcd.keys).toBeInstanceOf(Function);
    expect(ahcd.keys()).toBeInstanceOf(Array);
    expect(ahcd.keys().length).toEqual(3);
  });
});
