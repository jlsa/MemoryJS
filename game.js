function Game(settings) {
  this.init;
  this.board;
  this.settings = settings;
  this.firstCard;
  this.secondCard;
  this.durationBar;
  this.foundPairs = 0;
  this.startTime;
  this.endTime;
  this.elapsedTime = -1;
  this.modal;
  this.init();
}

Game.prototype.init = function() {
  // console.log('Game INIT');
  this.modal = new Modal();
  this.board = new Board();
  this.board.init(this.settings);
  for (var y = 0; y < this.board.boardSize; y++) {
    $row = $('<div />', {
      class: 'row'
    });
    for (var x = 0; x < this.board.boardSize; x++) {
      var card = this.board.getCard(x, y);
      $card = $('<div />', {
        class: 'col'
      });
      $card.css('background-color', '#' + card.inactiveColor);
      $card.text(card.letter);
      $card.attr('data-x', card.x);
      $card.attr('data-y', card.y);
      card.displayObj = $card;
      $row.append($card);
    }
    $('#speelveld').append($row);
  }
  // console.log(this.foundPairs);
  this.foundPairs = 0;
  this.elapsedTime = 0;
  this.startTime = null;
  this.endTime = null;

  $('#tijd').text(0);
  $('#gevonden').text(0);
  this.durationBar = new DurationBar();

  this.update();
};

Game.prototype.start = function() {
  this.startTime = new Date();
}

Game.prototype.addCard = function(card) {
  if (this.firstCard != null && this.secondCard != null) {
    if (this.firstCard.state != 'found') {
      this.firstCard.setState('inactive');
    }
    if (this.secondCard.state != 'found') {
      this.secondCard.setState('inactive');
    }
    this.firstCard = null;
    this.secondCard = null;
    this.durationBar.stop();
    this.durationBar.reset();
  }

  if (this.firstCard == null) {
    if (card.state != 'found') {
      this.durationBar.restart();
      this.durationBar.start();
      this.firstCard = card;
      card.setState('active');
    }
  }

  if (this.firstCard != null && this.secondCard == null && !card.equals(this.firstCard)) {
    this.secondCard = card;
    card.setState('active');
    if (this.secondCard.letter == this.firstCard.letter) {
      this.firstCard.setState('found');
      this.secondCard.setState('found');
      this.durationBar.stop();
      this.durationBar.reset();
      this.foundPairs++;

      var maxMatches = (this.board.boardSize * this.board.boardSize) / 2;
      if (this.foundPairs == maxMatches) {
        this.endTime = new Date();
        this.modal.show('Congratz you matched all cards in ' + Math.floor((this.endTime - this.startTime) / 1000) + ' seconds');
      }
    } else {
      // dont do anything here
    }
  }
}

Game.prototype.update = function() {
  var game = this;
  setTimeout(function() {
    game.render();
    game.durationBar.update();
    game.updateBoard();
    game.updatePlayTime();
    game.updateFoundPairs();
    game.update(); // recursive call
  }, 10);
};

Game.prototype.updateBoard = function() {
  if (game.durationBar.width == 0) {
    game.durationBar.stop();
    game.durationBar.reset();

    game.firstCard = null;
    game.secondCard = null;

    for (var i = 0; i < game.board.cards.length; i++) {
      var card = game.board.cards[i];
      if (card.state == 'active') {
        card.setState('inactive');
      }
    }
  }
}

Game.prototype.updateFoundPairs = function() {
  // console.log(this.foundPairs);
  $('#gevonden').text(this.foundPairs);
}

Game.prototype.updatePlayTime = function() {
  var elapsedTime;
  if (this.startTime != null && this.endTime == null) {
    var now = new Date();
    elapsedTime = Math.floor((now - this.startTime) / 1000);
  } else if (this.startTime != null && this.endTime != null) {
    elapsedTime = Math.floor((this.endTime - this.startTime) / 1000);
    this.elapsedTime = elapsedTime;
  }
  $('#tijd').text(elapsedTime);
}

Game.prototype.render = function() {
  for (var i = 0; i < this.board.cards.length; i++) {
    var card = this.board.cards[i];
    card.render();
  }
};
