# WebSnifferJS
Simple HTML parser for convert HTML page to Object.

## Install

``` bash
npm install --save web-sniffer-js

``` 

## Usage

Download content of link and pass to exec().

``` js
const webSniffer = require('web-sniffer-js');

const sniffer = new webSniffer;
 
// HtmlContent is the page content.
sniffer.exec(HtmlContent, HtmlObject => {
    // HtmlObject is your parse Object
});

```

## How is it works ?

One entites :
* HtmlContent : the content of your HTML file.

## Functions

Name | Available | Description | Additionnal
---- | --------- | ----------- | -----------
exec(HtmlContent: `string`, callback: `function`) : `HtmlObject` | ALL | Parse HTML content

```
