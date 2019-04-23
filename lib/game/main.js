/*
Chase Smith 2019
https://www.chasersmith.com
Version - GameJolt Web
This project was made to look into and learn ImpactJS
and is in no regards built well...
*/

ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.sound'
)
.defines(function(){

currentState = splashState;
versioncode = "v1.0.1";


MyGame = ig.Game.extend({

	init: function() {
		this.clearColor = '#1ad8cc';

		ig.input.bind( ig.KEY.MOUSE1, 'mouse1' );

		ig.music.add( 'media/music/1.ogg' );
		ig.music.add( 'media/music/2.ogg' );
		ig.music.add( 'media/music/3.ogg' );
		ig.music.add( 'media/music/4.ogg' );
		ig.music.add( 'media/music/5.ogg' );
		ig.music.add( 'media/music/6.ogg' );
		ig.music.add( 'media/music/7.ogg' );
		ig.music.add( 'media/music/8.ogg' );
		ig.music.add( 'media/music/9.ogg' );
		ig.music.add( 'media/music/10.ogg' );
		ig.music.add( 'media/music/11.ogg' );
		ig.music.add( 'media/music/12.ogg' );
		ig.music.volume = 0.4;
		ig.music.random = true;

		currentState.init();
		
	},
	
	update: function() {
		this.parent();
		
		if(changeBgColor){
			this.clearColor = '#FF8F77';
			changeBgColor = false;
		}

		currentState.update();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		font.draw( versioncode, 20, 30, ig.Font.ALIGN.LEFT );
		font.draw( 'GJweb', 20, 20, ig.Font.ALIGN.LEFT );
		
		currentState.draw();
	}
});



ig.main( '#canvas', MyGame, 60, 1024, 768, 1 );

});