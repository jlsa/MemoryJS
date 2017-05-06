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
var nextGameSettings = Object.create(defaultSettings);

var currentGameSettings;

var firstCard = null;
var secondCard = null;
var score = 0;
var gameStartTime;
var gameEndTime;
var showTimeDefault = 3; // seconds
var currentShowTime = 0;
var foundMatchingCards = 0;
var showTimeWidth = 185;

var timeLastFrame;


$(document).ready(function() {
  initGame(defaultSettings);
  timeLastFrame = new Date();
  tick();
});

function tick() {
  setTimeout(function() {
    updatePlayTime();
    updateShowTime();
    tick();
  }, 1);
}

function updatePlayTime() {
  if (gameStartTime != null) {
    console.log('tick');
    var now = new Date();
    var elapsedTime = Math.floor((now - gameStartTime) / 1000);
    $('#tijd').text(elapsedTime);
  }
}

function resetShowTime() {
  $('#timeLeft').css('width', 185);
  $('#timeLeft').css('background-color', '#4CAF50');
  showTimeWidth = 185;
}

function updateShowTime(deltaTime) {
  if (firstCard != null) {
    $('#timeLeft').css('width', showTimeWidth);
    if (showTimeWidth >= 0) {
      if (showTimeWidth > 125) {
        $('#timeLeft').css('background-color', '#4CAF50'); // green
      } else if (showTimeWidth < 100 && showTimeWidth > 50) {
        $('#timeLeft').css('background-color', '#FF6600'); // orange
      } else {
        $('#timeLeft').css('background-color', '#FF0000'); // red
      }
      showTimeWidth--;
    } else {
      showTimeWidth = 185;
    }
  }
}

$(document).on('click', 'div.col', function(e) {
  // console.log(e.target);
  clickedOnNode($(this));
  // console.log(currentGameSettings.board);
  if (firstCard != null) {
    console.log('firstCard: ' + firstCard.char);
  }
  if (secondCard != null) {
    console.log('secondCard: ' + secondCard.char);
  }
});

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

function changeColorOfNode(node) {
  if (node.hasClass('inactive')) {
    node.css('background-color', '#' + currentGameSettings.activeColor);
  } else if (node.hasClass('active')) {
    node.css('background-color', '#' + currentGameSettings.inactiveColor);
  } else if (node.hasClass('found')) {
    node.css('background-color', '#' + currentGameSettings.foundColor);
  }
}

function changeClassOfNode(node) {
  if (node.hasClass('inactive')) {
    node.removeClass('inactive');
    node.addClass('active');
  } else if (node.hasClass('active')) {
    node.removeClass('active');
    node.addClass('inactive');
  } else if (node.hasClass('found')) {
    node.removeClass('inactive');
    node.removeClass('active');
    node.addClass('found');
  }
}

function changeCharacterOfNode(node) {
  if (node.text() === currentGameSettings.defaultChar) {
    node.text(node.attr('char'));
  } else if (node.text() === node.attr('char')) {
    node.text(currentGameSettings.defaultChar);
  }
}

function flipCard(node) {
  changeColorOfNode(node);
  changeClassOfNode(node);
  changeCharacterOfNode(node);
}

function flipMatchedCards() {
  // not instantaniously
  $('#' + firstCard.id).css('background-color', '#' + currentGameSettings.foundColor);
  $('#' + secondCard.id).css('background-color', '#' + currentGameSettings.foundColor);
}

function checkForMatch() {
  if (firstCard.char == secondCard.char) {
    console.log('MATCH');
    flipMatchedCards();
    foundMatchingCards++;
    $('#gevonden').text(foundMatchingCards);
  } else {
    console.log('NO MATCH');
    var tempCardOne = firstCard.card;
    var tempCardTwo = secondCard.card;
    setTimeout(function() {
      flipCard(tempCardOne);
      flipCard(tempCardTwo);
    }, 500);
    // flipCard(firstCard.card);
    // flipCard(secondCard.card);
  }
  firstCard.card.data('locked',false);
  secondCard.card.data('locked',false);
  firstCard = null;
  secondCard = null;

  // firstCard.data('locked', false);
  // // flipCard(firstCard);
  // firstCard = null;
  // secondCard.data('locked', false);
  // // flipCard(secondCard);
  // secondCard = null;
}

function clickedOnNode(node) {
  console.log('node locked? ' + node.data('locked'));
  // console.log(node);
  var start = new Date();
  if (gameStartTime == null) {
    gameStartTime = new Date();
  }
  if (node.data('locked')) {
    // console.log('locked');
    return;
  }

  if (firstCard == null) {
    // console.log('firstCard is set');
    firstCard = {
      x: node.data('x'),
      y: node.data('y'),
      char: node.attr('char'),
      id: node.attr('id'),
      card: node
    };
    flipCard(node);
    node.data('locked', true);
    console.log('lock set on: x(' + node.data('x') + ') y(' + node.data('y') + ') char(' + node.attr('char') + ') ' + node.data('locked'));
    console.log(firstCard);
  }

  if (secondCard == null) {
    if (node.data('x') == firstCard.x && node.data('y') == firstCard.y && node.attr('char') == firstCard.char) {
      console.log('identical');
    } else {
      console.log('not identical');
      secondCard = {
        x: node.data('x'),
        y: node.data('y'),
        char: node.data('char'),
        id: node.attr('id'),
        card: node
      };
      flipCard(node);
      node.data('locked', true);
      checkForMatch();
    }


  }

  var elapsed = new Date() - start;
  console.log('click method ran for ' + elapsed);
}

// handle changes for next game
$('#character').on('change', function() {
  nextGameSettings.defaultChar = $('#character').val();
});

$('#size').on('change', function() {
  nextGameSettings.boardSize = $('#size').val();
});

$('#opnieuw').on('click', function() {
  nextGameSettings.charIndex = -1;
  nextGameSettings.board = generateCharacters(nextGameSettings.boardSize);
  gameStartTime = null;//new Date();
  initGame(nextGameSettings);
});

function initGame(settings) {
  currentGameSettings = Object.create(settings);
  var grid = '';
  for (var y = 0; y < settings.boardSize; y++) {
    for (var x = 0; x < settings.boardSize; x++) {
      grid = grid.concat('' + settings.board[y * settings.boardSize + x]);
    }
    grid = grid.concat('\n');
  }
  console.log(grid);
  var $row = $('<div />', {
    class: 'row'
  });

  var $col = $('<div />', {
    class: 'col inactive'
  });

  // first delete old board
  $('#speelveld').empty();

  for (var y = 0; y < settings.boardSize; y++) {
    $row = $('<div />', {
      class: 'row'
    });
    for (var x = 0; x < settings.boardSize; x++) {
      $colClone = $col.clone();
      $colClone.css('background-color', '#' + settings.inactiveColor);
      $colClone.text(settings.defaultChar);
      var ch = settings.nextChar(settings.board, settings.charIndex++)
      $colClone.attr('char', ch);
      $colClone.attr('data-char', ch);
      $colClone.attr('data-locked', false);
      $colClone.attr('data-x', x);
      $colClone.attr('data-y', y);
      $colClone.attr('id', 'card' + x + '-' + y);
      // $colClone.text($colClone.attr('char'));
      $row.append($colClone);
    }
    $('#speelveld').append($row.clone());
  }
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
