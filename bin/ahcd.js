#!/usr/bin/env node

const pkg  = require('../package')
const argv = require('minimist')(process.argv.slice(2));

if (argv['_'].length < 1 || typeof argv['h'] !== 'undefined'){
  console.error("================================================================================");
  console.error(pkg.description);
  console.error("");
  console.error(`Author     : ${pkg.author.name} <${pkg.author.email}> ${pkg.author.url}`);
  console.error(`Homepage   : ${pkg.homepage}`);
  console.error(`LICENSE    : ${pkg.license}`);
  console.error(`Report bugs: ${pkg.bugs.url}`);
  console.error("================================================================================");
  console.error("");
  console.error("Usage: ahcd [-h] <file> [-t <type>] [-d <dir>]");
  console.error("");
  process.exit(1);
}

/*
 read data from xml
 */
const AppleHealthCareData = require('../dist/ahcd');
console.log(`Read ${argv['_'][0]}`);
const fs   = require('fs')
const ahcd = new AppleHealthCareData(fs.readFileSync(argv['_'][0], 'utf8'));

/*
 read data from xml
 */
console.log(`Analyze ${argv['_'][0]}`);
ahcd.analyze().writeCsvs();

/*
 filter set dir from '-d'
 */
let dir = process.cwd();
if(typeof argv['d'] === 'string'){
  dir = argv['d'];
}

/*
 write specific CSV from '-t'
 */
if(typeof argv['t'] === 'string'){
  const k   = argv['t'];
  const csv = ahcd.csv(k);
  if(!csv){ console.error(`Records for "${k}" is not found`);
    process.exit(1);
  }
  const path = require('path').format({dir:dir,base:`${k}.csv`});
  fs.writeFileSync(path,csv,'utf-8');
  console.log(`Wrote ${path} (${csv.split("\n").length - 2} records)`);
  process.exit(0);
}

/*
 write all CSV
 */
ahcd.keys().forEach((k) => {
  const csv = ahcd.csv(k);
  const path = require('path').format({dir:dir,base:`${k}.csv`});
  fs.writeFileSync(path,csv,'utf-8');
  console.log(`Wrote ${path} (${csv.split("\n").length - 2} records)`);
});
