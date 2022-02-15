var table = $('table tr');

var player1_name = window.prompt("Player One: Enter your name, you will be blue")
var player1Color = 'rgb(86, 151, 255)'; //blue

var player2_name = window.prompt("Player Two: Enter your name, you will be red")
var player2Color = 'rgb(237, 45, 73)'; //red

var win = 0;

console.log("cxybobo");

function ChangeColor(row, col, colour){
    table.eq(row).find('td').eq(col).css('background-color', colour);
}

function ReturnColour(row, col){
    return table.eq(row).find('td').eq(col).css('background-color');
}

function CheckBottom(col){
    for (var i = 6; i >= 0; i --){
        if (table.eq(i).find('td').eq(col).css('background-color') === 'rgb(173, 216, 230)') return i;
        //alert(table.eq(i).find('td').eq(col).css('background-color'))
    }
}

function checkColourMatch(one, two, three, four) {
    if (one === two && one === three && one === four && one != 'rgb(173, 216, 230)' && one !== undefined) {
        return true;
    }
    return false;
}

function horizontalWin() {
  for (var row = 0; row < 7; row++) {
    for (var col = 0; col < 4; col++) {
      if (checkColourMatch(ReturnColour(row,col), ReturnColour(row,col+1) ,ReturnColour(row,col+2), ReturnColour(row,col+3))) {
        console.log('horiz');
        return true;
      }else {
        continue;
      }
    }
  }
}

function verticalWin() {
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 7; col++) {
      if (checkColourMatch(ReturnColour(row,col), ReturnColour(row+1,col) ,ReturnColour(row+2,col), ReturnColour(row+3,col))) {
        console.log('vertical');
        return true;
      }else {
        continue;
      }
    }
  }
}

function diagonalWin1() {
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      if (checkColourMatch(ReturnColour(row,col), ReturnColour(row+1,col+1) ,ReturnColour(row+2,col+2), ReturnColour(row+3,col+3))) {
        console.log('diagonal');
        return true;
      }else {
        continue;
      }
    }
  }
}

function diagonalWin2() {
  for (var row = 3; row < 7; row++) {
    for (var col = 0; col < 4; col++) {
      if (checkColourMatch(ReturnColour(row,col), ReturnColour(row-1,col+1) ,ReturnColour(row-2,col+2), ReturnColour(row-3,col+3))) {
        console.log('diagonal');
        return true;
      }else {
        continue;
      }
    }
  }
}



function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      //alert("game over!")
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
    }
  }
}

//game start

var currentPlayer = 1;
var currentName = player1_name;
var currentColour = player1Color;
$('h3').text(player1_name + ": this is your turn, please pick a column to drop your chip. ")


$("td").on('click',function() {

    // Recognize what column was chosen
    var col = $(this).closest("td").index();
    var row = CheckBottom(col);
    ChangeColor(row, col, currentColour);
    if (diagonalWin1()||diagonalWin2()||verticalWin()||horizontalWin()){
        gameEnd(currentName);
    }

    currentPlayer = currentPlayer * -1;

    if (currentPlayer !== 1) {
        currentName = player2_name;
        currentColour = player2Color;
    }
    else{
        currentName = player1_name;
        currentColour = player1Color;
    }
    $('h3').text(currentName + ": this is your turn, please pick a column to drop your chip. ")


})


