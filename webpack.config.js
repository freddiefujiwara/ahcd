module.exports = {
  mode: 'production',
  entry: './src/AppleHealthCareData.js',
  node: {
    fs: 'empty'
  },
  output: {
    library: 'AppleHealthCareData',
    libraryTarget: 'umd',
    globalObject: 'this',
    filename: 'ahcd.js'
  }
};

