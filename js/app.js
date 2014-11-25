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
//applied to all tiles



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
        window.setInterval(function() {
            var elapsedSeconds = (Date.now() - startTime) / 1000;
            elapsedSeconds = Math.floor(elapsedSeconds)
            $('#elapsed-seconds').text(elapsedSeconds + ' seconds');
        }, 1000);
        $('#game-board img').click(function () {
            console.log(this.alt);
            var clickedImg = $(this);
            var tile = clickedImg.data('tile');
            flipTile(tile, clickedImg);
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

function resetBoard () {
    $('#game-board').empty()
}