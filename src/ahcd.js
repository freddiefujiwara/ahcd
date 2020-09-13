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
  /**
   * printPrompt "db > "
   *
   */
  printPrompt(){
    const PROMPT = "db > ";
    this.write ? this.write(PROMPT) : process.stdout.write(PROMPT);
  }
  /**
   * readInputfrom stdin
   *
   */
  readInput(){
    // open fd
    let fd = process.stdin.fd;
    let devStdinOpened = false;
    const fs = require('fs');
    try {
      fd = fs.openSync('/dev/stdin', 'rs');
      devStdinOpened = true;
    } catch (e) {}

    // initialize buffers
    const ENDBYTE      = '\n'.charCodeAt(0);
    const BUFSIZE      = 256;
    const buf          = Buffer.alloc(BUFSIZE);
    let totalBuf       = Buffer.alloc(BUFSIZE);
    let totalBytesRead = 0;
    let bytesRead      = 0;
    let endByteRead    = false;

    // loop for stdin
    for (;;) {
      try {
        bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, null);

        const tmpBuf = Buffer.alloc(totalBytesRead + bytesRead);
        // totalBuf -> tmpBuf
        totalBuf.copy(tmpBuf, 0, 0, totalBytesRead);
        // append buf to tmpBuf
        buf.copy(tmpBuf, totalBytesRead, 0, bytesRead);
        // tmpBuf -> totalBuf
        totalBuf        = tmpBuf;
        totalBytesRead += bytesRead;

        // check it faced ENDBYTE or not
        buf.forEach((b,i) => {
          if (i >= bytesRead) return;
          if (b === ENDBYTE) {
            endByteRead = true;
            return;
          }
        });
        // finish if faced ENDBYTE
        if (endByteRead) { break; }
      } catch (e) {
        // finish if faced EOF
        if (e.code === 'EOF') { break; }
        throw e;
      }
      // finish if can't read anything
      if (bytesRead === 0) { break; }
    }
    // close fd if /dev/stdin is opened
    if (devStdinOpened) { fs.closeSync(fd); }
    return totalBuf.toString('utf-8').trim();
  }
  /**
   * store content from file
   * @param {string} file Target File
   * @returns {AppleHealthCareData} this This object
   * @desc
   * When you want to output the pairwise of the folloing Parameters and Parameter Values
   */
  run(){
    while(true){
      this.printPrompt();
      let input = this.readInput();
      if(input === ".exit") return;
      console.error(`Unrecognized command '${input}'`);
    }
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = AppleHealthCareData;
} else {
  window.AppleHealthCareData = AppleHealthCareData;
}
