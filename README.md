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
2. Parse functions

In order to parse an HTML page there are two functions at your disposal:

- parseWithLink(url, callback)

    * url: String -> Your Web page link;
    * callback: function -> The function execute when parser will end.

Exemple:
``` js
const webSniffer = require('web-sniffer-js');

const sniffer = new webSniffer;
 
sniffer.parseWithLink("http://...", HtmlObject => {
    // HtmlObject is your parse Object
});

```

- parseWithFile(HTMLPage, callback)

    * HTMLPage: String -> Your Web page content;
    * callback: function -> The function execute when parser will end.

Exemple:
``` js
const webSniffer = require('web-sniffer-js');

const sniffer = new webSniffer;
 
// HtmlContent is the page content.
sniffer.parseWithFile(HtmlContent, HtmlObject => {
    // HtmlObject is your parse Object
});

```

Return HTML Object

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

3. Search function

To search for web content at a specific position there is the function :

- search(stringSearch)

    * stringSearch: String -> The search line.

Syntax of the search line.

balise 1 name | [balise 1 content 1, balise 1 content 2, ...] ; balise 2 name | [balise 2 content 1, balise 2 content 2, ...] | {number of occurrences (min = 0) }; ...

No 'number of occurrences' mean search the first by default.


Ex : "body;nav|[id=\"menu\",class=\"test\"];ul;li|{3}"

Go to the balise 'body' search in the first balise 'nav' with 'id' is 'menu' et 'class' is 'test' and go to 'ul' and return the content from the fouth 'li'.

Usage Exemple :

``` js
const webSniffer = require('web-sniffer-js');

const sniffer = new webSniffer;
 
sniffer.parseWithLink("http://...", HtmlObject => {
    // HtmlObject is your parse Object
    let searchObject = sniffer.search("body;nav|[id=\"menu\",class=\"test\"];ul;li|{3}");
    // searchObject is the search result.
});


```

Return HTML Object

``` json

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

```

## Functions

Name | Available | Description
---- | --------- | -----------
parseWithLink(link: `string`, callback: `function`) : `HtmlObject` | ALL | Parse HTML content from a link page
parseWithFile(HtmlContent: `string`, callback: `function`) : `HtmlObject` | ALL | Parse HTML content
search(stringSearch: `string`) : `HtmlObject` | ALL | Parse HTML content

```
