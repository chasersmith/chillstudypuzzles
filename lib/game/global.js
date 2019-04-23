//Variables that need to be used globally

let font;
let currentState;
let changeBgColor;
let puzzleCount;

//splash state images
let imgSplash;

//menu state images
let imgTitle;
let imgName;
let imgButtonPlay;

//test state images
let imgCountdownSheet;
let imgSelector;
let imgButtonAgain;
let imgVictory;

//puzzleImages
let imgPuzzle = [];

ig.module( 
	'game.global' 
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){
    font = new ig.Font( 'media/04b03.font.png' );
    changeBgColor = false;
    puzzleCount = 8;

    //splash state images
    imgSplash = new ig.AnimationSheet( 'media/splash-anim.png', 273, 218 );

    //menu state images
    imgTitle = new ig.Image('media/title.png');
    imgName = new ig.Image('media/cstag.png');
    imgButtonPlay = new ig.Image('media/playbutton.png');

    //test state images
    imgCountdownSheet = new ig.AnimationSheet( 'media/counter.png', 177, 117 );
    imgSelector = new ig.Image('media/selector.png');
    imgButtonAgain = new ig.Image('media/againbutton.png');
    imgVictory = new ig.Image('media/complete.png');

    //puzzleImages
    for(var i = 0; i < puzzleCount; i++){
      imgPuzzle[i] = new ig.Image(`media/puzzles/${i+1}.png`)
    }
});

function getIndexOfK(arr, k) {
    for (var i = 0; i < arr.length; i++) {
      var index = arr[i].indexOf(k);
      if (index > -1) {
        return [i, index];
      }
    }
  }