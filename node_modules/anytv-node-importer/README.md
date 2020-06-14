# anytv-node-importer

[![Build Status](https://travis-ci.org/anyTV/anytv-node-importer.svg?branch=master)](https://travis-ci.org/anyTV/anytv-node-importer)
[![Coverage Status](https://coveralls.io/repos/anyTV/anytv-node-importer/badge.svg?branch=master&service=github&t)](https://coveralls.io/github/anyTV/anytv-node-importer?branch=master)
[![Documentation](https://doc.esdoc.org/github.com/anyTV/anytv-node-importer/badge.svg?branch=master&service=github)](https://doc.esdoc.org/github.com/anyTV/anytv-node-importer?branch=master)
[![Dependencies](https://david-dm.org/anyTV/anytv-node-mongo.svg)](https://david-dm.org/anyTV/anytv-node-mongo)
[![npm version](https://badge.fury.io/js/anytv-node-importer.svg)](https://badge.fury.io/js/anytv-node-importer)

Require files in a folder and turn them into an object. Especially made for our awesome expressjs [boilerplate](https://github.com/anyTV/anytv-node-boilerplate).


# Install

```sh
npm install anytv-node-importer --save
```

# Usage

### Importing all files in a folder
```javascript
import importer from 'anytv-node-importer';

const imports = importer.dirloadSync('./controllers');
```

# Documentation

Code documentation can be found at [here](https://doc.esdoc.org/github.com/anyTV/anytv-node-importer/).


# Contributing

Install the tools needed:
```sh
npm install babel -g
npm install esdoc -g
npm install mocha -g
npm install --dev
```

To compile the ES6 source code to ES5:
```sh
npm run compile
```

To generate the docs:
```sh
npm run docs
```

# Running test

```sh
npm test
```

# Code coverage

```sh
npm run coverage
```
Then open coverage/lcov-report/index.html.

# License

MIT


# Author
[Freedom! Labs, any.TV Limited DBA Freedom!](https://www.freedom.tm)
