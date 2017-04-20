<h1 align="center">cobalt-markdown</h1>
<h4 align="center">
  Parser for markdown-like file-format with support for meta data.
</h4>
<p align="center">
  <img alt="license" src="https://img.shields.io/github/license/capevace/halbert.svg">
  <img alt="release" src="https://img.shields.io/github/release/capevace/cobalt.svg">
  <img alt="npm downloads" src="https://img.shields.io/npm/dt/cobalt-markdown.svg">
</p>

> **cobalt-markdown** gives the ability to store JSON metadata for the content right in the same file.

```bash
npm install cobalt-markdown --save
# or
yarn add cobalt-markdown
```

## How it works
The cobalt-markdown file (*.comd*) is divided into to parts, separated by a combination of characters.

```json
{
  "some-valid-json": "for the metadata"
}
---

# Markdown content here
```

The top part of the file resembles the metadata that is stored in the file, whereas the bottom part is the actual content.

The two parts are separated by three dashes that have to be placed on its own line (surrounded by a minimum line-breaks).

**VALID:**
```json
{}
---
# Content


{}

---


# Content

```

**INVALID:**
```json
{}---
# Content
```

Please note that it does not matter how the JSON itself is formatted, as long as it is valid JSON.

## Usage
The library includes two functions: `parseCobaltMarkdown` and `generateCobaltMarkdown`.

```js
const {
  parseCobaltMarkdown,
  generateCobaltMarkdown
} = require('cobalt-markdown');

```

### parseCobaltMarkdown(content: String) -> Object
This method is used to parse the cobalt string it is given. This can be the contents of a file or of other sources.
It returns an object containing the parsed metadata and the markdown contents.

```js
const content = readContentFromFile(...);

console.log(parseCobaltMarkdown(content));
// {
//    meta: {...},
//    content: '...'
// }
```

### generateCobaltMarkdown(meta: Object, [content: String], [readable: Boolean]) -> String
This method generates valid cobalt-markdown with given metadata. The contents can actually be empty and are not required.
The readable flag makes the file more readable by formatting the JSON.

```js
const meta = {valid: true};
const content = '# Markdown Content';

console.log(generateCobaltMarkdown(meta, content));
// {"valid":true}
// ---
// # Markdown Content
```

## License
Copyright 2017 Lukas von Mateffy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
