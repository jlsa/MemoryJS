var defaultSettings = {
  activeColor: '008C00',
  inactiveColor: 'ff0000',
  foundColor: '800080',
  boardSize: 6,
  defaultChar: '*',
  board: generateCharacters(6), // P1:1
  charIndex: -1,
  nextChar: function(board, charIndex) {
    var nextIndex = charIndex + 1;
    return board[nextIndex];
  }
}

var game = null;
var nextGameSettings = Object.create(defaultSettings);
var currentGameSettings = Object.create(defaultSettings);

var board = null;
var firstCard = null;
var secondCard = null;

var score = 0;
var gameStartTime;
var gameEndTime;
var showTimeDefault = 3000; // seconds
var currentShowTime = 0;
var showTimeStart;

var foundMatchingCards = 0;
var showTimeWidth = 185;

var timeLastFrame;


$(document).ready(function() {
// initGame(defaultSettings);
  game = new Game(defaultSettings);
});

$(document).on('click', 'div.col', function(e) {
  clickHandler($(this));
});

function clickHandler(boardObj) {
  console.log("Clicked on:", boardObj);
  var card = game.board.getCard(boardObj.data('x'), boardObj.data('y'));
  console.log(card);
  // if (card.isLocked()) {
  //   return;
  // }
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

function renderBoard(b) {
  // first delete old board so it doesnt stack
  $('#speelveld').empty();

  for (var y = 0; y < b.boardSize; y++) {
    $row = $('<div />', {
      class: 'row'
    });
    for (var x = 0; x < b.boardSize; x++) {
      var card = b.getCard(x, y);
      $card = $('<div />', {
        class: 'col inactive card'
      });
      $card.css('background-color', '#' + card.inactiveColor);
      $card.text(card.defaultChar);
      $card.attr('char', card.letter);
      $card.attr('data-char', card.letter);
      $card.attr('data-locked', card.locked);
      $card.attr('data-x', card.x);
      $card.attr('data-y', card.y);
      $card.attr('id', 'card' + x + '-' + y);
      card.displayObj = $card;
      $row.append($card);
    }
    $('#speelveld').append($row);
  }
}

function initGame(settings) {
  currentGameSettings = Object.create(settings);
  consolePrintBoard(settings);
  board = new Board();
  board.init(defaultSettings);
  renderBoard(board);
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

function consolePrintBoard(settings) {
  var grid = '';
  for (var y = 0; y < settings.boardSize; y++) {
    for (var x = 0; x < settings.boardSize; x++) {
      grid = grid.concat(' ' + settings.board[y * settings.boardSize + x]);
    }
    grid = grid.concat('\n');
  }
  console.log(grid);
}
