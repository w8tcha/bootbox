# Bootbox - Bootstrap powered alert, confirm and flexible dialog boxes

FORKED Version using Vanilla Javascript instead of jQuery

[![NPM Version](http://img.shields.io/npm/v/@w8tcha/bootbox.svg?style=flat)](https://npmjs.org/package/@w8tcha/bootbox)
[![NPM Downloads](http://img.shields.io/npm/dm/@w8tcha/bootbox.svg?style=flat)](https://npmjs.org/package/@w8tcha/bootbox)

Please see http://bootboxjs.com for full usage instructions, or head over to http://paynedigital.com/bootbox for
the original writeup about the project.

## Contributing

Please see the [CONTRIBUTING](https://github.com/bootboxjs/bootbox/blob/master/CONTRIBUTING.md) file for guidelines.

## Running Tests

Tests are run using [Karma](http://karma-runner.github.io/0.8/index.html) using the Mocha test adapter. To run the tests yourself, simply run 

```
npm i w8tcha/bootbox
``` 

within the project followed by 

```
npm test
```

Tests are run against the generated files contained in the `/dist` directory - regenerate those files and run the Karma tests by simply running Grunt:

```
npm run build
```

When submitting pull requests, ensure your tests pass. **Pull-requests with failing tests will be rejected.** See the
[CONTRIBUTING](https://github.com/bootboxjs/bootbox/blob/master/CONTRIBUTING.md) file for more information.

## 6.0.5 (Latest Release)

- Updates prompt input validation to apply `was-validated` class to form when **OK** button is clicked
- Updates prompt input to trigger form submit when "enter" key is pressed

For a full list of releases and changes please see [the changelog](https://github.com/bootboxjs/bootbox/blob/master/CHANGELOG.md).

## License

(The MIT License)

Copyright (C) by Nick Payne <nick@kurai.co.uk>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE
