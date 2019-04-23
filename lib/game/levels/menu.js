let menuState = {};

menuState.init = function() {

	changeBgColor = true;
	ig.music.next();
	
	this.playButton = {
		x: 410,
		y: 450,
		width: 210,
		height: 66,
		image: imgButtonPlay
	};
}
	
menuState.update = function() {
	if(ig.input.pressed('mouse1')){
		if(ig.input.mouse.x > this.playButton.x && ig.input.mouse.x < this.playButton.x + this.playButton.width &&
		   ig.input.mouse.y > this.playButton.y && ig.input.mouse.y < this.playButton.y + this.playButton.height){
			   currentState = testState;
			   testState.init();
		   }
	}

}
	
menuState.draw = function() {
	imgTitle.draw(180,150);
	this.playButton.image.draw(this.playButton.x, this.playButton.y);
	imgName.draw(385, 700);
}