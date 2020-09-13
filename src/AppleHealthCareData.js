/**
 * @classdesc
 * Apple Health Care Data convert xml to csv
 * usage :
 * const ahcd = new AppleHealthCareData(xml);
 * ahcd.analyze().writeCsvs();
 * ahcd.keys().forEach((k) => console.log(ahcd.csv(k)));
 *
 */
class AppleHealthCareData {
  /**
   * @constructor
   * @params {string} xml
   * @desc
   * this.nodes : parse by using elementtree
   * this.results : {}
   * this.csvs : {}
   */
  constructor(xml){
    this.nodes = require('elementtree').parse(xml)._root.getchildren();
    this.results = {};
    this.csvs = {};
  }
  /**
   * analyze
   * @returns {AppleHealthCareData} this This object
   * @desc
   * crawl this.nodes to fillout this.results
   *
   */
  analyze(){
    this.results = {};
    this.nodes.forEach((node) => {
      if('Record' === node.tag && node.attrib['type']){
        // shorten identifier
        const match = node.attrib['type'].match(/^HK.*TypeIdentifier(.+)$/);
        if(!match || 0 === match.length) return;
        const key = match[1];
        // initialize this.results[key]
        if(!this.results[key]){
          this.results[key] = {header :[] , records:[]};
          Object.keys(node.attrib).filter((k) => 'type' !== k)
            .forEach((k) => this.results[key].header.push({id:k,title:k}));
        }
        const record = {};
        this.results[key].header.forEach((h) => {
          record[h.id] = node.attrib[h.id];
        });
        this.results[key].records.push(record);
      }
    });
    return this;
  }
  /**
   * writeCsvs
   * @returns {AppleHealthCareData} this This object
   * @desc
   * crawl this.results to fillout this.csvs
   *
   */
  writeCsvs(){
    const createCsvWriter = require('csv-writer').createObjectCsvStringifier;
    Object.keys(this.results).forEach((k) => {
      const csvWriter = createCsvWriter({
        header: this.results[k].header
      });
      //await csvWriter.writeRecords(this.results[k].records);
      this.csvs[k] =
        csvWriter.getHeaderString() +
        csvWriter.stringifyRecords(this.results[k].records);
    });
    return this;
  }

  /**
   * csv
   * @params {string} key
   * @returns {string} csv string
   *
   */
  csv(key){
    return this.csvs[key];
  }

  /**
   * keys
   * @returns {array} all keys
   *
   */
  keys(){
    return Object.keys(this.csvs);
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = AppleHealthCareData;
} else {
  window.AppleHealthCareData = AppleHealthCareData;
}
