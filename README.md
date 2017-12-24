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
* HtmlContent (default instance never use by you)

The principe is to run asynchronouse (or not) function easily and manage them when the worker has finished with a callback.
Launch any request on any element.

## Functions

Name | Available | Description | Additionnal
---- | --------- | ----------- | -----------
exec(HtmlContent: `string`, callback: `function`) : `HtmlObject` | ALL | Parse HTML content

```
