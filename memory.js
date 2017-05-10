var defaultSettings = {
  activeColor: '008C00',
  inactiveColor: 'ff0000',
  foundColor: '800080',
  boardSize: 6,
  defaultChar: '*',
  board: generateCharacters(6),
  charIndex: -1,
  nextChar: function(board, charIndex) {
    var nextIndex = charIndex + 1;
    return board[nextIndex];
  }
}

var started = false;
var game = null;
var nextGameSettings = Object.create(defaultSettings);
var currentGameSettings = Object.create(defaultSettings);

var playedGames = [];

$(document).ready(function() {
  game = new Game(defaultSettings);
});

$(window).on('click', function(e) {
  var target = $(e.target);
  // console.log(target);

  if (target.is('span')) {
    if (target.attr('class') == 'close') {
      game.modal.hide();
    }
  }

  if (target.is('div')) {
    if (target.attr('id') == 'myModal') {
      game.modal.hide();
    }
  }
  if (target.is('div')) {
    if (target.attr('class') == 'col') {
      clickHandler(target);
    }
  }

  if (target.attr('id') == 'opnieuw') {
    game.startTime = null;
    game.endTime = null;
    started = false;
    nextGameSettings.charIndex = -1;
    nextGameSettings.board = generateCharacters(nextGameSettings.boardSize);
    $('#speelveld').empty();
    game = new Game(nextGameSettings);
  }
});

$(window).on('change', function(e) {
  var target = $(e.target);
  if (target.attr('id') == 'character') {
    nextGameSettings.defaultChar = target.val();
  }

  if (target.attr('id') == 'size') {
    nextGameSettings.boardSize = target.val();
  }

  if (target.attr('id') == 'username') {
    // console.log('username: ' + target.val());
    // console.log('playtime: ' + (game.elapsedTime));
    var playedGame = {
      username: target.val(),
      playtime: game.elapsedTime
    }
    playedGames[playedGames.length] = playedGame;

    updateStatistics();
    game.modal.hide();
  }
});

function updateStatistics() {
  // sort so that the players with the shortest playtime are on top.
  $('#topscores').empty();
  // console.log(playedGames);
  for (var i = 0; i < playedGames.length; i++) {
    var playedGame = playedGames[i];
    $('#topscores').append('<li>' + playedGame.username + '</li>');
  }
}

function clickHandler(boardObj) {
  if (started == false) {
    game.start();
    started = true;
  }
  var card = game.board.getCard(boardObj.data('x'), boardObj.data('y'));
  game.addCard(card);
}

function generateCharacters(boardSize) {
  var alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'
  ];

  var characters = alphabet.slice(0, (boardSize*boardSize) / 2);
  // double the array with the same array
  characters = characters.concat(characters);
  characters = shuffleCharacters(characters);
  return characters;
}

// shuffle used from http://stackoverflow.com/a/6274381
function shuffleCharacters(characters) {
  var j, x, i;
  for (i = characters.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = characters[i - 1];
    characters[i - 1] = characters[j];
    characters[j] = x;
  }
  return characters;
}

function setColor(className) {
  var color;
  if (className === 'div.inactive') {
    color = $('#valueinactive').val();
    nextGameSettings.inactiveColor = color;
  } else if (className === 'div.active') {
    color = $('#valueactive').val();
    nextGameSettings.activeColor = color;
  } else if (className === 'div.found') {
    color = $('#valuefound').val();
    nextGameSettings.foundColor = color;
  } else {
    color = '000000';
  }
}
