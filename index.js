var fs = require('fs');
var linefeed = process.platform === 'win32' ? '\r\n' : '\n';

module.exports = function(options){

	fs.readFile(options.filePath, function(err, f){
		if (err) {options.callback(err); return;}
    if (typeof options.lineNumber === 'undefined') {
    	options.callback('pick-lines-from-file: lineNumber option should be defined');
    	return;
    }
    var lines = f.toString().split(linefeed);
		if (options.lineNumber < lines.length){
			var linesAround = options.linesAround || 0;
			var startLine = options.lineNumber - linesAround, 
			endLine = options.lineNumber + linesAround;
			if (startLine < 0){
				startLine = 0;
			}
			if (endLine >= lines.length){
				endLine = lines.length - 1;
			}
			options.callback(false, {
				lines: lines.splice(startLine, endLine - startLine + 1),
				startAt: startLine,
				endAt: endLine
			});
		} else {
			options.callback('pick-lines-from-file: file' + options.filePath + 
				'doesn\'t have ' + options.lineNumber + 'lines');
		}
	});
};