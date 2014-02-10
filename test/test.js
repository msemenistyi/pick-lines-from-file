var linePicker = require('../');

describe('pick-lines-from-file should', function(){


	var stdOptions = {
		filePath: __dirname + '/fixtures/zapovit.txt',
		lineNumber: 5,
		linesAround: 0
	};
	var filePath;

	beforeEach(function(){
		filePath = __dirname + '/fixtures/zapovit.txt';
	});

	it('should return right number of lines', function(done){
		linePicker(filePath).lineNumbers(5).linesAround(2).fetch(function (err, data){
			data.lines.length.should.be.equal(5);
			done();
		});
	});

	it('should return right start and end lines numbers', function(done){
		linePicker(filePath).lineNumbers(5).linesAround(2).fetch(function (err, data){
			data.startAt.should.be.equal(3);
			data.endAt.should.be.equal(7);
			done();
		});
	});

	it('should return one line if linesAround is not specified', function(done){
		linePicker(filePath).lineNumbers(5).linesAround(0).fetch(function (err, data){
			data.startAt.should.be.equal(5);
			data.endAt.should.be.equal(5);
			data.lines.length.should.be.equal(1);
			data.lines[0].should.be.equal('So that the fields, the boundless steppes,');
			done();
		});
	});
	
	it('should not contain \\r for windows lines', function(done){
		linePicker(filePath).lineNumbers(5).linesAround(0).fetch(function (err, data){
			data.lines[0].should.be.equal('So that the fields, the boundless steppes,');
			done();
		});
	});
	
	it('should return right lines for file with less lines at the beginning', function(done){
		linePicker(filePath).lineNumbers(2).linesAround(3).fetch(function (err, data){
			data.startAt.should.be.equal(0);
			data.endAt.should.be.equal(5);
			data.lines[0].should.be.equal('Testament (Zapovit)');
			done();
		});
	});
	
	it('should return error if line number is bigger than lines in file number', 
		function(done){
			linePicker(filePath).lineNumbers(27).linesAround(0).fetch(function (err, data){
				err.should.be.not.equal(false);
				(typeof data).should.be.equal('undefined');
				done();
			});
	});
	
	it('should return error if file is missing', function(done){
		linePicker('asd').lineNumbers(2).fetch(function (err, data){
			err.should.be.not.equal(false);
			(typeof data).should.be.equal('undefined');
			done();
		});
	});
	
	it('should return error if lineNumbers is called with udefined', function(done){
		linePicker(filePath).lineNumbers(undefined).fetch(function (err, data){
				err.should.be.not.equal(false);
				(typeof data).should.be.equal('undefined');
				done();
		});
	});
	
	it('should return error if lineNumbers method was not called', function(done){
		linePicker(filePath).fetch(function (err, data){
				err.should.be.not.equal(false);
				(typeof data).should.be.equal('undefined');
				done();
		});
	});
	
	it('should return array of results if several lineNumbers were passed', function(done){
		linePicker(filePath).lineNumbers([5, 9]).fetch(function (err, data){
				err.should.be.equal(false);
				data.length.should.be.ok;
				data[0].lines[0].should.be.equal('So that the fields, the boundless steppes,');
				data[1].lines[0].should.be.equal('When from Ukraine the Dnieper bears');
			done();
		});
	});
	
	it('should return array of results if several lineNumbers were passed and ' + 
			'linesAround specified', function(done){
		linePicker(filePath).lineNumbers([5, 9]).linesAround(2).fetch(function (err, data){
				err.should.be.equal(false);
				data.length.should.be.ok;
				data[0].lines[0].should.be.equal('My tomb upon a grave mound high');
				data[1].lines[0].should.be.equal('My eyes could see, my ears could hear');
			done();
		});
	});
	
	it('should return right lines for file with less lines at the ending', function(done){
		linePicker(filePath).lineNumbers(24).linesAround(3).fetch(function (err, data){
			data.startAt.should.be.equal(21);
			data.endAt.should.be.equal(25);
			data.lines[data.lines.length - 1].should.be.equal('— Taras Shevchenko.');
			done();
		});
	});
	
});

