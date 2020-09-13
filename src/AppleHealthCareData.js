/**
 * @classdesc
 * REPL for jssqlite
 *
 *
 */
class AppleHealthCareData {
  /**
   * @constructor
   * @desc
   * set this.poolSize = 20;
   * set this.filter = undefined;
   */
  constructor(xml){
    this.nodes = require('elementtree').parse(xml)._root.getchildren();
    this.results = {};
    this.csvs = {};
  }
  /**
   * printPrompt "db > "
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
   * readInputfrom stdin
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
   * readInputfrom stdin
   *
   */
  csv(key){
    return this.csvs[key];
  }

  /**
   * readInputfrom stdin
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
