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
  constructor(write){
    this.write = write;
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = AppleHealthCareData;
} else {
  window.AppleHealthCareData = AppleHealthCareData;
}
