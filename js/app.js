// ap.js: our main javascript file for this app
"use strict";

var tilesList = [];
var idx;
for (idx = 1; idx <= 32; idx++) {
    tilesList.push ({
        tileNum: idx,
        src: 'img/tile' + idx + '.jpg',
        flipped: false,
        matched: false
    });
} 
var timer; 
var Score = 0;
var Reminder =8;
var Attempts =0;
var turnTile = [];
var turningPicture = [];

//Created a Instruction button for user to be inform on the function toward how to play the game.
//Created a alert when you clicked on the button. It will provide user will instruction toward the game.
$('#help').click(function() {
    alert ('This will be the Instruction to guide you to play the Memory Game. There is 16 random iamges, click on the two images that are the same. And you win.')
});

$(document).ready(function() {
    //click button to start the game
    $('#start-game').click(function() {
        resetBoard() 
       tilesList = _.shuffle(tilesList);
       var selectTiles = tilesList.slice(0, 8); 
       //Select an array values of 0 to 7 for titlesList
       var tilePairs = [];
        _.forEach(selectTiles, function(tile) {
            tilePairs.push(tile);
            tilePairs.push(_.clone(tile));
        });
        tilePairs = _.shuffle(tilePairs);
        var gameBoard = $('#game-board');
        var row = $(document.createElement('div'));
        var img;
        _.forEach(tilePairs, function(tile, elementIndex) {
            if (elementIndex > 0 && 0 == (elementIndex % 4)) {
                gameBoard.append(row);
                row = $(document.createElement('div'));
            }
            img = $(document.createElement('img'));
            img.attr({
                src: 'img/tile-back.png',
                alt: 'tile ' + tile.tileNum
            });
            img.data('tile', tile);
            row.append(img);
        });
        gameBoard.append(row);
        //get starting milliseconds
        //Varabile for StartingTIme
        var startTime = Date.now();
        timer = window.setInterval(function() {
            $('#Score').text(Score);
            $('#Reminder').text(Reminder);
            $('#Attempts').text(Attempts);
            var elapsedSeconds = (Date.now() - startTime) / 1000;
            elapsedSeconds = Math.floor(elapsedSeconds)
            $('#elapsed-seconds').text(elapsedSeconds + ' seconds');
            if (Reminder == 0) {
                alert("Congratulation, you won!");
                resetBoard();
            }
        }, 1000);
        $('#game-board img').click(function () {
            var clickedImg = $(this);
            var tile = clickedImg.data('tile');
            if (tile.flipped == false) {
                flipTile(tile, clickedImg);
                turnup(tile, clickedImg);
            } else {
                alert("This title has been already selected");
            }
            //start game button click
        });
    }); 
    
}); 


function flipTile(tile, img) {
    window.setTimeout(function () {
        img.fadeOut(100, function() {
            if (tile.flipped) {
                img.attr('src', 'img/tile-back.png');
            }
            else {
                img.attr('src', tile.src);
            }
            tile.flipped = !tile.flipped;
            img.fadeIn(100);
        });
    }, 100);
}

//function for reset the gameBoard
function resetBoard () {
    $('#game-board').empty()
    $('#Score').empty();
    $('#Reminder').empty();
    $('#Attempts').empty();
    $('#Result').empty();
    window.clearInterval(timer)
    Score = 0;
    Reminder = 8;
    Attempts = 0;
    tilesList = [];
    for (idx = 1; idx <= 32; idx++) {
        tilesList.push ({
            tileNum: idx,
            src: 'img/tile' + idx + '.jpg',
            flipped: false,
            matched: false
        });
    } 
}

//function for turning the tile
function turnup (tile,img) {
    window.setTimeout (function() {
        turnTile.push(tile);
        turningPicture.push(img);
        console.log(turnTile)
        if (turnTile.length == 2) {
            if (turnTile[1].tileNum == turnTile[0].tileNum) {
                if (turnTile[0].matched == false && turnTile[1].matched == false) {
                    Score = Score + 1;
                    Reminder = Reminder - 1
                    turnTile[1].matched = true;
                    turnTile[0].matched = true;
                    turningPicture[1].attr('src', turnTile[1].src);
                    turningPicture[0].attr('src', turnTile[0].src); 
                    $('#Result').text('Matched');
                }
            }
            else {
                Attempts = Attempts + 1;
                turnTile[1].flipped = false;
                turnTile[0].flipped = false;
                turningPicture[1].attr('src','img/tile-back.png');
                turningPicture[0].attr('src','img/tile-back.png');   
                $('#Result').text('Not a Match');
            }
            turnTile = [];
            turningPicture = [];
        }   
    }, 1000);
}


