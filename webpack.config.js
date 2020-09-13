module.exports = {
  mode: 'production',
  entry: './src/AppleHealthCareData.js',
  node: {
    fs: 'empty'
  },
  output: {
    library: '',
    libraryExport: '',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
    filename: 'ahcd.js'
  }
};

