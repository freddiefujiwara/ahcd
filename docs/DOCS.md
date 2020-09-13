<a name="AppleHealthCareData"></a>

## AppleHealthCareData
<p>Apple Health Care Data convert xml to csv
usage :
const ahcd = new AppleHealthCareData(xml);
ahcd.analyze().writeCsvs();
ahcd.keys().forEach((k) =&gt; console.log(ahcd.csv(k)));</p>

**Kind**: global class  
**Params**: <code>string</code> xml  

* [AppleHealthCareData](#AppleHealthCareData)
    * [new AppleHealthCareData()](#new_AppleHealthCareData_new)
    * [.analyze()](#AppleHealthCareData+analyze) ⇒ [<code>AppleHealthCareData</code>](#AppleHealthCareData)
    * [.writeCsvs()](#AppleHealthCareData+writeCsvs) ⇒ [<code>AppleHealthCareData</code>](#AppleHealthCareData)
    * [.csv()](#AppleHealthCareData+csv) ⇒ <code>string</code>
    * [.keys()](#AppleHealthCareData+keys) ⇒ <code>array</code>

<a name="new_AppleHealthCareData_new"></a>

### new AppleHealthCareData()
<p>this.nodes : parse by using elementtree
this.results : {}
this.csvs : {}</p>

<a name="AppleHealthCareData+analyze"></a>

### appleHealthCareData.analyze() ⇒ [<code>AppleHealthCareData</code>](#AppleHealthCareData)
<p>crawl this.nodes to fillout this.results</p>

**Kind**: instance method of [<code>AppleHealthCareData</code>](#AppleHealthCareData)  
**Returns**: [<code>AppleHealthCareData</code>](#AppleHealthCareData) - <p>this This object</p>  
<a name="AppleHealthCareData+writeCsvs"></a>

### appleHealthCareData.writeCsvs() ⇒ [<code>AppleHealthCareData</code>](#AppleHealthCareData)
<p>crawl this.results to fillout this.csvs</p>

**Kind**: instance method of [<code>AppleHealthCareData</code>](#AppleHealthCareData)  
**Returns**: [<code>AppleHealthCareData</code>](#AppleHealthCareData) - <p>this This object</p>  
<a name="AppleHealthCareData+csv"></a>

### appleHealthCareData.csv() ⇒ <code>string</code>
<p>csv</p>

**Kind**: instance method of [<code>AppleHealthCareData</code>](#AppleHealthCareData)  
**Returns**: <code>string</code> - <p>csv string</p>  
**Params**: <code>string</code> key  
<a name="AppleHealthCareData+keys"></a>

### appleHealthCareData.keys() ⇒ <code>array</code>
<p>keys</p>

**Kind**: instance method of [<code>AppleHealthCareData</code>](#AppleHealthCareData)  
**Returns**: <code>array</code> - <p>all keys</p>  
