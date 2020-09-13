[![npm version](https://badge.fury.io/js/ahcd.svg)](https://badge.fury.io/js/ahcd)
# ahcd
Apple Health Care Data convert xml to csv

# Introduction.

Are you using the iOS app [Health](https://www.apple.com/ios/health/)?
If you're one of those people, your health data, such as your weight, sleep duration, and steps, is might recorded on your Apple Health app.
The app shows some graph and visible data on the app, but why don't you want to analyze the data yourself.
there are many forms of data analysis and data visualization. In this repository , I'd like to use a spreadsheet application like Excel or Google Sheets to csv output for analysis.
I'm going to show you how to do this with [I created a CLI](https://www.npmjs.com/package/ahcd).

# How to extract Apple health data.
First, take a look at this 

![](https://freddiefujiwara.github.io/ahcd/ezgif.com-video-to-gif.gif)

- Open Health on your iPhone.
- Tap the profile icon in the top right corner.
- Scroll to the bottom of your health profile and tap "Export All Health Data".
- Tap "Export" to confirm you want to export the data and start the export process (may take some minutes to complete)
- Save the extracted file to your local computer or Google Drive

# extracted files.
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1817/177f49a3-a068-c6c9-f42c-363a1817c3ca.png)
you are going to use the **export.xml** in the context

# Nodejs Environment Settings


Please build a local Nodejs environment by referring to the following links
- [How to Install Node.js and NPM on Windows](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
- [Installing Node.js® and NPM on Mac](https://treehouse.github.io/installation-guides/mac/node-mac.html)

# How to install the command
Install the command [ahcd](https://www.npmjs.com/package/ahcd)

```bash
$ npm i -g ahcd
```

# Usage.

```bash
$ ahcd                                                                                                                                                                                                
================================================================================
Apple Health Care Data convert xml to csv

Author     : Fumikazu Fujiwara 
Homepage   : https://github.com/freddiefujiwara/ahcd#readme
LICENSE    : MIT
Report bugs: https://github.com/freddiefujiwara/ahcd/issues
================================================================================

Usage: ahcd [-h] <file> [-t <type>] [-d <dir>]
```
- The **＜file＞** argument must be **export.xml** which I mentioned.
- -t outputs only a specific csv (e.g. -t BodyMass)
- -d specifies the directory to output to (e.g., -d /path/to)

# Demo

```bash
$ ahcd -d . export.xml                                                                                                                                                                                
Read export.xml
Analyze export.xml
Wrote . /Height.csv (1 records)
Wrote . /HeartRate.csv (87 records)
Wrote . /BodyMassIndex.csv (50 records)
Wrote . /BloodPressureDiastolic.csv (165 records)
Wrote . /BodyMass.csv (51 records)
Wrote . /BodyFatPercentage.csv (50 records)
Wrote . /FlightsClimbed.csv (1045 records)
Wrote . /BloodPressureSystolic.csv (165 records)
Wrote . /SleepAnalysis.csv (1193 records)
Wrote . /StepCount.csv (12032 records)
Wrote . /DistanceWalkingRunning.csv (13631 records)
```
 
# Finally
Now you can analyze it in a sheet such as Excel and google sheet.
Also, [ahcd](https://www.npmjs.com/package/ahcd) is welcome to [pull request](https://github.com/freddiefujiwara/ahcd/issues)
Thanks for reading the final part of the article
