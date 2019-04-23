let testState = {};

testState.init = function() {

	//selector is blue outline on selected piece
	this.selector = {
		image: imgSelector,
		x: 0,
		y: 0,
		enabled: false
	}

	this.againButton = {
		x: 410,
		y: 450,
		width: 210,
		height: 66,
		image: imgButtonAgain
	};

	this.countdownAnim = new ig.Animation( imgCountdownSheet, 1, [0,1,2,3]);

	this.completedAllPuzzles = false;

	this.finishedPuzzle = [
		[1,2,3],
		[4,5,6],
		[7,8,9],
	];
	
	this.puzzlePics = [1,2,3,4,5,6,7,8];
	this.pickPuzzleImage();

	//first is variable whether it is first selection or not, selection 1 and 2 are indexes of data selected
	this.first = 0;
	this.selectionOne;
	this.selectionTwo;
}

testState.pickPuzzleImage = function(){

	this.countdownAnim.gotoFrame(0);
	this.timer = new ig.Timer();
	this.timer.delta();
	this.timer.set(4);
	this.timer.delta();

	//This is the set of numbers correlating with each piece, this in order is a completed puzzle
	this.puzzleNumbs = [1,2,3,4,5,6,7,8,9];

	this.puzzleData = [
		[this.pickPuzzlePiece(),this.pickPuzzlePiece(),this.pickPuzzlePiece()],
		[this.pickPuzzlePiece(),this.pickPuzzlePiece(),this.pickPuzzlePiece()],
		[this.pickPuzzlePiece(),this.pickPuzzlePiece(),this.pickPuzzlePiece()],
	];
	
	this.pickedPuzzle = this.puzzlePics[Math.floor(Math.random() * this.puzzlePics.length)];
	console.log(this.pickedPuzzle);


	if(this.pickedPuzzle != undefined){
		this.puzzleThumb = imgPuzzle[this.pickedPuzzle-1];
		this.puzzleImage = new ig.BackgroundMap(128, this.puzzleData, imgPuzzle[this.pickedPuzzle-1]);

		console.log(imgPuzzle[this.pickedPuzzle-1]);

		for( var i = 0; i < this.puzzlePics.length; i++){ 
			if ( this.puzzlePics[i] == this.pickedPuzzle) {
				this.puzzlePics.splice(i, 1);
			}
		}
	}
	else if(this.pickedPuzzle == undefined){
		this.completedAllPuzzles = true;
	}
}
	
testState.update = function() {

	this.countdownAnim.update();

	if(ig.input.pressed('mouse1')){
		if(!this.completedAllPuzzles){
			if (this.first == 0){
				this.first = 1;
				this.checkClickedOnPiece(1);
			}
			else if(this.first == 1){
				this.first = 0;
				this.checkClickedOnPiece(0);
			}
		}
		else if(this.completedAllPuzzles){
			if(ig.input.mouse.x > this.againButton.x && ig.input.mouse.x < this.againButton.x + this.againButton.width &&
				ig.input.mouse.y > this.againButton.y && ig.input.mouse.y < this.againButton.y + this.againButton.height){
					this.init();
					this.completedAllPuzzles = false;
			}
		}
	}
}
	
testState.draw = function() {
	if(!this.completedAllPuzzles && this.timer == null){
		this.puzzleImage.setScreenPos(-300,-200);
		this.puzzleImage.draw();
	}
	else if(this.completedAllPuzzles){
		imgVictory.draw(300, 200);
		this.againButton.image.draw(this.againButton.x, this.againButton.y);
	}
	
	if(this.timer != null && this.timer.delta() < 0 && !this.completedAllPuzzles){
		this.countdownAnim.draw(410,50);
		this.puzzleThumb.draw(300, 200);
	}
	else if(this.timer != null && this.timer.delta() > 0){
		//delete timer
		this.timer = null
	}

	if(this.selector.enabled)
		this.selector.image.draw(this.selector.x, this.selector.y);

}

testState.pickPuzzlePiece = function() {

	//choose a random number correllating to a piece then remove and add to puzzle data
	this.selection = this.puzzleNumbs[Math.floor(Math.random()*this.puzzleNumbs.length)];
	for( var i = 0; i < this.puzzleNumbs.length; i++){ 
		if ( this.puzzleNumbs[i] === this.selection) {
		  this.puzzleNumbs.splice(i, 1); 
		}
	 }
	return this.selection;
}

testState.checkClickedOnPiece = function(first1){
	let value;

	if(ig.input.mouse.x > 300 && ig.input.mouse.x < 428 && ig.input.mouse.y > 200 && ig.input.mouse.y < 328){
		value = [0,0];
		this.selector.x = 300;
		this.selector.y = 200;
	}
	else if(ig.input.mouse.x > 428 && ig.input.mouse.x < 556 && ig.input.mouse.y > 200 && ig.input.mouse.y < 328){
		value = [0,1];
		this.selector.x = 428;
		this.selector.y = 200;
	}
	else if(ig.input.mouse.x > 556 && ig.input.mouse.x < 684 && ig.input.mouse.y > 200 && ig.input.mouse.y < 328){
		value = [0,2];
		this.selector.x = 556;
		this.selector.y = 200;
	}
	else if(ig.input.mouse.x > 300 && ig.input.mouse.x < 428 && ig.input.mouse.y > 328 && ig.input.mouse.y < 452){
		value = [1,0];
		this.selector.x = 300;
		this.selector.y = 328;
	}
	else if(ig.input.mouse.x > 428 && ig.input.mouse.x < 556 && ig.input.mouse.y > 328 && ig.input.mouse.y < 452){
		value = [1,1];
		this.selector.x = 428;
		this.selector.y = 328;
	}
	else if(ig.input.mouse.x > 556 && ig.input.mouse.x < 684 && ig.input.mouse.y > 328 && ig.input.mouse.y < 452){
		value = [1,2];
		this.selector.x = 556;
		this.selector.y = 328;
	}
	else if(ig.input.mouse.x > 300 && ig.input.mouse.x < 428 && ig.input.mouse.y > 452 && ig.input.mouse.y < 580){
		value = [2,0];
		this.selector.x = 300;
		this.selector.y = 456;
	}
	else if(ig.input.mouse.x > 428 && ig.input.mouse.x < 556 && ig.input.mouse.y > 452 && ig.input.mouse.y < 580){
		value = [2,1];
		this.selector.x = 428;
		this.selector.y = 456;
	}
	else if(ig.input.mouse.x > 556 && ig.input.mouse.x < 684 && ig.input.mouse.y > 452 && ig.input.mouse.y < 580){
		value = [2,2];
		this.selector.x = 556;
		this.selector.y = 456;
	}

	//determine if it is first or second click and apply to selected value
	if(first1 == 1 && this.puzzleData[value[0]][value[1]] != 1){
		this.selectionOne = value;
		this.selector.enabled = true;
	}
	else if(first1 == 0){
		this.selectionTwo = value;
		this.selector.enabled = false;
		this.testPieces();
	}
	else if (this.puzzleData[value[0]][value[1]] == 1){
		this.first = 0;
	}
}
//This function tests if piece selected is next to empty spot in a really inefficient way...
testState.testPieces = function(){

	emptySpace = getIndexOfK(this.puzzleData, 1);

	if(this.puzzleData[this.selectionTwo[0]][this.selectionTwo[1]] == 1){

		if(emptySpace[0] == 0 && emptySpace[1] == 0){
			if(this.puzzleData[emptySpace[0]][emptySpace[1]+1] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]+1][emptySpace[1]] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ){
				this.switchPieces();
			}
		}
		else if(emptySpace[0] == 0 && emptySpace[1] == 1){
			if(this.puzzleData[emptySpace[0]][emptySpace[1]+1] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]][emptySpace[1]-1] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]+1][emptySpace[1]] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ){
				this.switchPieces();
			}
		}
		else if(emptySpace[0] == 0 && emptySpace[1] == 2){
			if(this.puzzleData[emptySpace[0]][emptySpace[1]-1] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]+1][emptySpace[1]] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ){
				this.switchPieces();
			}
		}
		else if(emptySpace[0] == 1 && emptySpace[1] == 0){
			if(this.puzzleData[emptySpace[0]][emptySpace[1]+1] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]+1][emptySpace[1]] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]-1][emptySpace[1]] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ){
				this.switchPieces();
			}
		}
		else if(emptySpace[0] == 1 && emptySpace[1] == 1){
			if(this.puzzleData[emptySpace[0]][emptySpace[1]+1] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]+1][emptySpace[1]] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]-1][emptySpace[1]] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]][emptySpace[1]-1] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ){
				this.switchPieces();
			}
		}
		else if(emptySpace[0] == 1 && emptySpace[1] == 2){
			if(this.puzzleData[emptySpace[0]][emptySpace[1]-1] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]+1][emptySpace[1]] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]-1][emptySpace[1]] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ){
				this.switchPieces();
			}
		}
		else if(emptySpace[0] == 2 && emptySpace[1] == 0){
			if(this.puzzleData[emptySpace[0]][emptySpace[1]+1] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]-1][emptySpace[1]] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ){
				this.switchPieces();
			}
		}
		else if(emptySpace[0] == 2 && emptySpace[1] == 1){
			if(this.puzzleData[emptySpace[0]][emptySpace[1]+1] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]][emptySpace[1]-1] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]-1][emptySpace[1]] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ){
				this.switchPieces();
			}
		}
		else if(emptySpace[0] == 2 && emptySpace[1] == 2){
			if(this.puzzleData[emptySpace[0]][emptySpace[1]-1] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ||
				this.puzzleData[emptySpace[0]-1][emptySpace[1]] == this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] ){
				this.switchPieces();
			}
		}
	}
}

testState.switchPieces = function(){
	//Get copy of what pictures were at index
	let firstCopy = this.puzzleData[this.selectionOne[0]][this.selectionOne[1]];
	let secondCopy = this.puzzleData[this.selectionTwo[0]][this.selectionTwo[1]]

	//set index to copy pictrues to switch them
	this.puzzleData[this.selectionOne[0]][this.selectionOne[1]] = secondCopy;
	this.puzzleData[this.selectionTwo[0]][this.selectionTwo[1]] = firstCopy;

	//this.puzzleData = [[1,2,3],[4,5,6],[7,8,9]];
	//update puzzle
	this.puzzleImage = new ig.BackgroundMap(128, this.puzzleData, imgPuzzle[this.pickedPuzzle-1]);
	
	this.checkVictory();
}

testState.checkVictory = function(){
	let victoryArr = [];
	let victoryCheck = 0;

	//convert puzzledata into single dimension array
	for(var i = 0; i < this.puzzleData.length; i++){
		for(var k = 0; k< this.puzzleData.length; k++){
			victoryArr.push(this.puzzleData[i][k]);
		}
	}
	//add count to victory check if piece is in order
	for(var i = 0; i < victoryArr.length; i++){
		if(victoryArr[i] == i+1){
			victoryCheck += 1;
		}
	}
	//if 9 pieces were in order, user won
	if(victoryCheck == 9){
		this.pickPuzzleImage();
	}
}