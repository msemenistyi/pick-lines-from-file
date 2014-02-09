[![Build Status](https://travis-ci.org/msemenistyi/pick-lines-from-file.png?branch=master)](https://travis-ci.org/msemenistyi/pick-lines-from-file)

## Install
> npm install pick-lines-from-file

## Overview
This module can be used for picking several lines from file. The main purpose
is to pick one line which is probably important one and also context for it 
(a bit more lines). 

##Usage

```js
		var options = {
			filePath: __dirname + '/zapovit.txt',
			lineNumber: 3,
			linesAround: 2,
			callback: function (err, data){
			if (!err){
				var start = data.startAt;
				var linesCount = data.endAt - data.startAt;
				console.log('Total ' + linesCount + 'lines.');
				for (var i = 0, l = data.lines.length; i < l; i++)
					console.log('#' + (start + i));
					console.log('|' + data.lines[i]);
				}
			}
		};
		pickLines(options);
```

###Options 
- **filePath** - path to file which should be read. If fs.readFile returns error,
it's being passed to callback provided.
- **lineNumber** - center line number (which is most probably the one you are
insterested in).
- **linesAround** - number of lines to the top and to the bottom of center line
which also will be returned from function. (e.g. for linesAround = 2 two lines
would be taken to the top of lineNumber and to the bottom). If there are no
more lines available at the start or at the end of the file, all possible will 
be returned. 
- **callback** - function which will be executed after file is processed. Function
accepts 2 arguments. The first one is **error** and the second is **data**.  

**Data** hash contains 3 properties:
- **lines** - array of lines picked.
- **startAt** - the first returned line number. 
- **endAt** - the last returned line number. 


##Contributing
Feel free to open issues and send PRs, though make sure that you create tests
for new functionality and amend ones for fixes and changes. 

## Running tests
Run `npm test` in order to see test results.

## License

The MIT License (MIT)

Copyright (c) 2014 Semenistyi Mykyta nikeiwe@gmail.com

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
THE SOFTWARE.