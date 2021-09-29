# Raise

Raise is a small utility to throw meaningful error with ease.

## Installation

```
$ npm install node-raise --save
```

## Usage

```javascript
var
    raise = require('node-raise');

raise(Error, 'An error message with %s %d %j', 'string', 1, { key: 'value' }, 'and something else');
```

First argument is the error type; second argument is a printf-like format string; remaining arguments are actual values for placeholders in second argument.

See Node.js' `util.format` for further info.

## License

The project is licensed under the MIT license.
