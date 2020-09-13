#!/usr/bin/env node
const pkg = require('../package')
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
console.log(`Read ${argv['_'][0]}`);
let data = undefined;
try{
  data = require('elementtree').parse(require('fs').readFileSync(argv['_'][0], 'utf8'));
}catch(e){
  console.error(e);
  process.exit(1);
}

/*
 read data from xml
 */
console.log(`Analyze ${argv['_'][0]}`);
const root = data._root;
const nodes = root.getchildren();
let results = {};
nodes.forEach((node) => {
  if(node.tag === 'Record'){
    if(node.attrib['type']){
      // shorten identifier
      const match = node.attrib['type'].match(/^HK.*TypeIdentifier(.+)$/);
      if(!match || match.length === 0) return;
      const key = match[1];
      // initialize results[key]
      if(!results[key]){
        results[key] = {header :[] , records:[]};
        results[key].header = Object.keys(node.attrib).filter((k) => k !== 'type');
      }
      const record = [];
      results[key].header.forEach((h) => {
        record.push(node.attrib[h]);
      });
      results[key].records.push(record);
    }
  }
});
/*
 filter for argv['t']
 */
if(typeof argv['t'] === 'string'){
  const type = argv['t'];
  const typeResults = results[type];
  if(!typeResults){ console.error(`Records for "${type}" is not found`);
    process.exit(1);
  }
  results = {};
  results[type] = typeResults;
}
let dir = process.cwd();
if(typeof argv['d'] === 'string'){
  dir = argv['d'];
}

/*
 write CSV
 */
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
Object.keys(results).forEach(async (k) => {
  const path = require('path').format({dir:dir,base:`${k}.csv`});
  const csvWriter = createCsvWriter({
    header: results[k].header,
    path: path
  });
  await csvWriter.writeRecords(results[k].records);
  console.log(`Wrote ${path} (${results[k].records.length} records)`);
});
