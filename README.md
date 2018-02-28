# cyclic-next

[![npm](https://img.shields.io/npm/v/cyclic-next.svg)](https://www.npmjs.com/package/cyclic-next)
[![license](https://img.shields.io/npm/l/cyclic-next.svg)](https://abhisekp.mit-license.org/)
[![github-issues](https://img.shields.io/github/issues/abhisekp/cyclic-next.svg)](https://github.com/abhisekp/cyclic-next/issues)
[![travis-status](https://img.shields.io/travis/abhisekp/cyclic-next.svg)](https://travis-ci.org/abhisekp/cyclic-next)
[![coveralls](https://img.shields.io/coveralls/abhisekp/cyclic-next.svg)](https://coveralls.io/github/abhisekp/cyclic-next)
[![codecov](https://codecov.io/gh/abhisekp/cyclic-next/branch/master/graph/badge.svg)](https://codecov.io/gh/abhisekp/cyclic-next)
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Open Source Helpers](https://www.codetriage.com/abhisekp/cyclic-next/badges/users.svg)](https://www.codetriage.com/abhisekp/cyclic-next)

Get the cyclic next integer.


## Features
Finds the cyclic next integer of a given number given the maximum bound.

e.g.
Given maximum bound of `5`    
```text
   1
 /   \
0     2
 \   /
  4-3  
```  
cyclic next of `4` will be `0`.

## Install

```sh
npm install cyclic-next
```

## Usage

```js
import cyclicNext from 'cyclic-next';

cyclicNext(5, 0) //=> 1
cyclicNext(5, 1) //=> 2
cyclicNext(5, 2) //=> 3
cyclicNext(5, 3) //=> 4
cyclicNext(5, 4) //=> 0
cyclicNext(5, 4, 1) //=> 0
cyclicNext(5, 4, 3) //=> 2
```

## Author

[Abhisek Pattnaik](https://about.me/abhisekp)

## License

- [**MIT**](https://abhisekp.mit-license.org/) © [**Abhisek Pattnaik**](https://github.com/abhisekp)

## Contributing

Contributions are highly welcome! This repo is commitizen friendly — please read about it [here](http://commitizen.github.io/cz-cli/).
