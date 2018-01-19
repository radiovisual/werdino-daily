# werdino-daily [![Build Status](https://travis-ci.org/radiovisual/werdino-daily.svg?branch=master)](https://travis-ci.org/radiovisual/werdino-daily)

> :pizza: :hamburger: The Werdino daily menu in English and German


## Install

```
$ npm install werdino-daily
```

## Usage

```js
const werdino = require('werdino-daily');

werdino().then(data => {
    const { de, en } = data;
}
```

## CLI Usage

Install globally with `$ npm install werdino-daily` to get the cli version

```
$ werdino-daily
```

![](media/screenshot.png)

```
$ werdino-daily md
```

Output Markdown to paste the output into Slack or elsewhere.

![image](https://user-images.githubusercontent.com/5614571/35171310-a98cce60-fd63-11e7-92c1-9e3ff3d8138c.png)