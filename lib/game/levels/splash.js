let splashState = {};

splashState.init = function() {
	// Initialize your game here; bind keys etc.
	this.splashTimer = 0;
	this.splashAnim = new ig.Animation( imgSplash, 0.07, [0,1,2,3,4,5,6,7,8,9,10]);
}
	
splashState.update = function() {
	this.splashTimer += 1;
	
	if(this.splashTimer >= 160 && this.splashAnim.frame != 10){
		this.splashAnim.update();
	}
	else if(this.splashAnim.frame == 10){
		this.cleanUp();
		currentState = menuState;
		currentState.init();
	}
}
	
splashState.draw = function() {
	this.x = ig.system.width/2;
	this.y = ig.system.height/2;
	
	this.splashAnim.draw(this.x-120, this.y-100);
}

splashState.cleanUp = function() {
	this.splashTimer = null;
	this.splashAnim = null;
	this.x = null;
	this.y = null;
	splashState = {};
}