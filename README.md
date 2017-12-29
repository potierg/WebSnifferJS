# WebSnifferJS
Simple HTML parser for convert HTML page to Object.

## Install

``` bash
npm install --save web-sniffer-js

``` 

## Usage

1. Download content

Page HTML

``` html

<!DOCTYPE html>
<html lang="en">

<body>
    <nav id="menu" class="test">
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/page/">Page</a>
            </li>
            <li>
                <a href="/page2/">Page2</a>
            </li>
            <li>
                <a href="/rss/" target="_blank">RSS</a>
            </li>
        </ul>
    </nav>
</body>

</html>

```
2. Exec function

In order to parse an HTML page there are two functions at your disposal:

- parseWithLink(url, callback)

    * url: String -> Your Web page link;
    * callback: function -> The function execute when parser will end.

- parseWithFile(HTMLPage, callback)

    * HTMLPage: String -> Your Web page content;
    * callback: function -> The function execute when parser will end.

``` js
const webSniffer = require('web-sniffer-js');

const sniffer = new webSniffer;
 
sniffer.parseWithLink("http://...", HtmlObject => {
    // HtmlObject is your parse Object
});

// HtmlContent is the page content.
sniffer.parseWithFile(HtmlContent, HtmlObject => {
    // HtmlObject is your parse Object
});

```

Return Object

``` json

[
    {
    "name": "html",
    "content": [
        "lang=\"en\""
    ],
    "is_end": false,
    "next": [
        {
        "name": "body",
        "content": null,
        "is_end": false,
        "next": [
            {
            "name": "nav",
            "content": [
                "id=\"menu\"",
                "class=\"test\""
            ],
            "is_end": false,
            "next": [
                {
                "name": "ul",
                "content": null,
                "is_end": false,
                "next": [
                    {
                    "name": "li",
                    "content": null,
                    "is_end": false,
                    "next": [
                        {
                        "name": "a",
                        "content": [
                            "href=\"/\""
                        ],
                        "is_end": false,
                        "value": "Home"
                        }
                    ]
                    },
                    {
                    "name": "li",
                    "content": null,
                    "is_end": false,
                    "next": [
                        {
                        "name": "a",
                        "content": [
                            "href=\"/page/\""
                        ],
                        "is_end": false,
                        "value": "Page"
                        }
                    ]
                    },
                    {
                    "name": "li",
                    "content": null,
                    "is_end": false,
                    "next": [
                        {
                        "name": "a",
                        "content": [
                            "href=\"/page2/\""
                        ],
                        "is_end": false,
                        "value": "Page2"
                        }
                    ]
                    },
                    {
                    "name": "li",
                    "content": null,
                    "is_end": false,
                    "next": [
                        {
                        "name": "a",
                        "content": [
                            "href=\"/rss/\"",
                            "target=\"_blank\""
                        ],
                        "is_end": false,
                        "value": "RSS"
                        }
                    ]
                    }
                ]
                }
            ]
            }
        ]
        }
    ]
    }
]

```

## Functions

Name | Available | Description | Additionnal
---- | --------- | ----------- | -----------
parseWithLink(link: `string`, callback: `function`) : `HtmlObject` | ALL | Parse HTML content from a link page
parseWithFile(HtmlContent: `string`, callback: `function`) : `HtmlObject` | ALL | Parse HTML content

```
