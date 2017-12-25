# WebSnifferJS
Simple HTML parser for convert HTML page to Object.

## Install

``` bash
npm install --save web-sniffer-js

``` 

## Usage

Download content of link and pass to exec().

Page HTML

``` html

<html lang="en" prefix="og: http://ogp.me/ns#" class="screen-fill-root">

<head>
    <meta charset="utf-8">
    <title>npm</title>
    <link rel="stylesheet" media="all" href="/static/css/components.css?last-changed&#x3D;27945fe466447deb7646454bfc1909b9">
    <noscript>
        <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=278690589151673&ev=PageView&noscript=1"
        />
    </noscript>
</head>

<body itemscope itemtype="http://schema.org/WebSite" data-crumb="nnmd_WaXXN7TRoBxoY7LzEp5Zkgh1nGHkKOauDDBsUV" class="screen-fill-body">
    <meta itemprop="url" content="https://www.npmjs.com/">
    <header class="logged-in   ">
        <div class="header-item user-info-container">
            <div class="user-info">
                <div class="drop-down-menu-container" role="navigation">

                    <a id="user-info-drop-down-menu-toggle" class="drop-down-menu-toggle" href="#user-info-menu" role="button" aria-haspopup="true"
                        aria-owns="user-info-menu">
                        <span class="a11y-only">Toggle User Menu</span>
                    </a>

                    <div role="menu" id="user-info-menu" class="drop-down-menu" aria-labelledby="user-info-drop-down-menu-toggle">
                        <div class="drop-down-menu-section">
                            <ul>
                                <li>
                                    <a href="/settings/tokens">Tokens</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</body>

</html>

```


``` js
const webSniffer = require('web-sniffer-js');

const sniffer = new webSniffer;
 
// HtmlContent is the page content.
sniffer.exec(HtmlContent, HtmlObject => {
    // HtmlObject is your parse Object
});

```

Page HTML

``` json

{"message":[{"name":"html","content":["lang=\"en\"","prefix=\"og: http://ogp.me/ns#\"","class=\"screen-fill-root\""],"is_end":false,"next":[{"name":"head","content":null,"is_end":false,"next":[{"name":"meta","content":["charset=\"utf-8\""],"is_end":false,"value":"","next":null},{"name":"title","content":null,"is_end":false,"value":"npm"},{"name":"link","content":["rel=\"stylesheet\"","media=\"all\"","href=\"/static/css/components.css?last-changed&#x3D;27945fe466447deb7646454bfc1909b9\""],"is_end":true,"pos_end":119},{"name":"noscript","content":null,"is_end":false,"next":[{"name":"img","content":["height=\"1\"","width=\"1\"","style=\"display:none\"","src=\"https://www.facebook.com/tr?id=278690589151673&ev=PageView&noscript=1\""],"is_end":true,"pos_end":124}]}]},{"name":"body","content":["itemscope","itemtype=\"http://schema.org/WebSite\"","data-crumb=\"nnmd_WaXXN7TRoBxoY7LzEp5Zkgh1nGHkKOauDDBsUV\"","class=\"screen-fill-body\""],"is_end":false,"next":[{"name":"meta","content":["itemprop=\"url\"","content=\"https://www.npmjs.com/\""],"is_end":false,"value":"","next":null},{"name":"header","content":[],"is_end":false,"next":[{"name":"div","content":["class=\"header-item user-info-container\""],"is_end":false,"next":[{"name":"div","content":["class=\"user-info\""],"is_end":false,"next":[{"name":"div","content":["class=\"drop-down-menu-container\"","role=\"navigation\""],"is_end":false,"next":[{"name":"a","content":["id=\"user-info-drop-down-menu-toggle\"","class=\"drop-down-menu-toggle\"","href=\"#user-info-menu\"","role=\"button\"","aria-haspopup=\"true\"\r\n","aria-owns=\"user-info-menu\""],"is_end":false,"next":[{"name":"span","content":["class=\"a11y-only\""],"is_end":false,"value":"Toggle User Menu"}]},{"name":"div","content":["role=\"menu\"","id=\"user-info-menu\"","class=\"drop-down-menu\"","aria-labelledby=\"user-info-drop-down-menu-toggle\""],"is_end":false,"next":[{"name":"div","content":["class=\"drop-down-menu-section\""],"is_end":false,"next":[{"name":"ul","content":null,"is_end":false,"next":[{"name":"li","content":null,"is_end":false,"next":[{"name":"a","content":["href=\"/settings/tokens\""],"is_end":false,"value":"Tokens"}]}]}]}]}]}]}]}]},{"name":"footer","content":["class=\"pane bg-npm-navy-1\""],"is_end":false,"next":[{"name":"div","content":["class=\"container\""],"is_end":false,"next":[{"name":"div","content":["class=\"row\""],"is_end":false,"next":[{"name":"div","content":["class=\"col-md-6 col-md-offset-3\""],"is_end":false,"next":[{"name":"hr","content":["class=\"divider-1\""],"is_end":false,"value":"","next":null},{"name":"ul","content":["class=\"list-unstyled h6 em-default\""],"is_end":false,"next":[{"name":"li","content":["class=\"pbl\""],"is_end":false,"next":[{"name":"a","content":["class=\"type-neutral-11\"","href=\"http://status.npmjs.org/\""],"is_end":false,"value":"Registry Status"}]}]}]}]}]},{"name":"div","content":["class=\"txt-c container\""],"is_end":false,"next":[{"name":"a","content":["class=\"npm-loves-you type-neutral-11\"","href=\"/\""],"is_end":false,"value":"\r\n npm loves you\r\n "}]}]}]}]}]}

```

## How is it works ?

One entites :
* HtmlContent : the content of your HTML file.

## Functions

Name | Available | Description | Additionnal
---- | --------- | ----------- | -----------
exec(HtmlContent: `string`, callback: `function`) : `HtmlObject` | ALL | Parse HTML content

```

## Exemples



```