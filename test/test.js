var pickLines = require('../');

describe('pick-lines-from-file should', function(){

	var stdOptions = {
		filePath: __dirname + '/fixtures/zapovit.txt',
		lineNumber: 5,
		linesAround: 0
	};


	it('should return right number of lines', function(done){
		var options = Object.create(stdOptions);
		options.linesAround = 2;
		options.callback = function (err, data){
			data.lines.length.should.be.equal(5);
			done();
		};
		pickLines(options);
	});

	it('should return right start and end lines numbers', function(done){
		var options = Object.create(stdOptions);
		options.linesAround = 2;
		options.callback = function(err, data){
			data.startAt.should.be.equal(3);
			data.endAt.should.be.equal(7);
			done();
		};
		pickLines(options);
	});
	
	it('should not contain \\r for windows lines', function(done){
		var options = Object.create(stdOptions);
		options.callback = function(err, data){
			data.lines[0].should.be.equal('So that the fields, the boundless steppes,');
			done();
		};
		pickLines(options);
	});
	
	it('should return right lines for file with less lines at the beginning', function(done){
		var options = Object.create(stdOptions);
		options.lineNumber = 2;
		options.linesAround = 3;
		options.callback = function(err, data){
			data.startAt.should.be.equal(0);
			data.endAt.should.be.equal(5);
			data.lines[0].should.be.equal('Testament (Zapovit)');
			done();
		};
		pickLines(options);
	});
	
	it('should return right lines for file with less lines at the ending', function(done){
		var options = Object.create(stdOptions);
		options.lineNumber = 24;
		options.linesAround = 3;
		options.callback = function(err, data){
			data.startAt.should.be.equal(21);
			data.endAt.should.be.equal(25);
			data.lines[data.lines.length - 1].should.be.equal('— Taras Shevchenko.');
			done();
		};
		pickLines(options);
	});
	
});

