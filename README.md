# cyclic-next

[![npm](https://img.shields.io/npm/v/cyclic-next.svg)](https://www.npmjs.com/package/cyclic-next)
[![license](https://img.shields.io/npm/l/cyclic-next.svg)](https://abhisekp.mit-license.org/)
[![github-issues](https://img.shields.io/github/issues/abhisekp/cyclic-next.svg)](https://github.com/abhisekp/cyclic-next/issues)
[![Build Status](https://travis-ci.org/abhisekp/cyclic-next.svg?branch=master)](https://travis-ci.org/abhisekp/cyclic-next)
[![coveralls](https://img.shields.io/coveralls/abhisekp/cyclic-next.svg)](https://coveralls.io/github/abhisekp/cyclic-next)
[![codecov](https://codecov.io/gh/abhisekp/cyclic-next/branch/master/graph/badge.svg)](https://codecov.io/gh/abhisekp/cyclic-next)
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Finds the cyclic next integer of a given number given the maximum bound.

e.g.
Given a maximum bound of `5`

```text
   1
 /   \
0     2
 \   /
  4-3
```

cyclic next of `0` will be `1`  
cyclic next of `1` will be `2`  
cyclic next of `3` will be `4`  
cyclic next of `4` will be `0`

## Install

```sh
# yarn add cyclic-next
npm install --save cyclic-next # npm i -S cyclic-next
```

## API

```
cyclicNext(
  max: number,
  curr: number = 0,
  inc: number = 1
): number

max - The Maximum number to cycle around {number}
[curr=0] - Current number {number}
[inc=1] - Increment amount {number}
- Return The cyclic next number {number}
```

## Usage

```js
// import { cyclicNext } from 'cyclic-next';
const { cyclicNext } = require('cyclic-next');

cyclicNext(5, 0); //=> 1
cyclicNext(5, 1); //=> 2
cyclicNext(5, 2); //=> 3
cyclicNext(5, 3); //=> 4
cyclicNext(5, 4); //=> 0
cyclicNext(5, 4, 1); //=> 0
cyclicNext(5, 4, 3); //=> 2
```

## Author

[Abhisek Pattnaik](https://about.me/abhisekp)

## License

[**MIT**](https://abhisekp.mit-license.org/) © [**Abhisek Pattnaik**](https://github.com/abhisekp)

## Contributing

Contributions are highly welcome! This repo is commitizen friendly — please read about it [here](http://commitizen.github.io/cz-cli/).
