var fs = require('fs');
var linefeed = process.platform === 'win32' ? '\r\n' : '\n';

module.exports = function(filePath){
	return new LinePicker(filePath);
}


function LinePicker(filePath){
	this.filePath = filePath;
	return this;
}

LinePicker.prototype.lineNumbers = function(lineNumbers) {
	if (typeof lineNumbers === 'number'){
		this.lineNumbersCollection = [];
		this.lineNumbersCollection[0] = lineNumbers;
	} else if (lineNumbers instanceof Array){
		this.lineNumbersCollection = lineNumbers;
	}
	return this;
};

LinePicker.prototype.linesAround = function(linesAround) {
	this.linesAroundNumber = linesAround || 0;
	return this;
};


LinePicker.prototype.fetch = function(callback) {
	this.linesAroundNumber = this.linesAroundNumber || 0;
	fs.readFile(this.filePath, function(err, f){
		if (err) {callback(err); return;}
		if (typeof this.lineNumbersCollection === 'undefined') {
			callback('pick-lines-from-file: at least one line number should be' +  
				'defined. Call lineNumbers method with integer argument before fetch');
			return;
		}
		var lines = f.toString().split(linefeed),
		 lineNumber,
		 result = [];

		for (var i = 0, l = this.lineNumbersCollection.length; i < l; i++){
			lineNumber = this.lineNumbersCollection[i];
			if (lineNumber < lines.length){
				var startLine = lineNumber - this.linesAroundNumber, 
				endLine = lineNumber + this.linesAroundNumber;
				if (startLine < 0){
					startLine = 0;
				}
				if (endLine >= lines.length){
					endLine = lines.length - 1;
				}
				result.push({
					lines: lines.slice(startLine, endLine + 1),
					startAt: startLine,
					endAt: endLine
				});
			} else {
				callback('pick-lines-from-file: file' + this.filePath + 
					'doesn\'t have ' + lineNumber + 'lines');
				return;
			}
		}
		if (result.length === 1) result = result[0];
		callback(false, result);
	}.bind(this));
};