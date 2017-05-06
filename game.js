function Game(settings) {
  this.init;
  this.board;
  this.settings = settings;
  this.init();
  this.firstCard;
  this.secondCard;
  this.startTime;
  this.endTime;
  this.lastClickTime;
}

Game.prototype.newGame = function(settings) {
  // generate all
};

Game.prototype.init = function() {
  console.log('Game INIT');
  this.board = new Board();
  this.board.init(this.settings);
  for (var y = 0; y < this.board.boardSize; y++) {
    $row = $('<div />', {
      class: 'row'
    });
    for (var x = 0; x < this.board.boardSize; x++) {
      var card = this.board.getCard(x, y);
      $card = $('<div />', {
        class: 'col inactive card'
      });
      $card.css('background-color', '#' + card.inactiveColor);
      $card.text(card.defaultChar);
      $card.attr('data-x', card.x);
      $card.attr('data-y', card.y);
      card.displayObj = $card;
      $row.append($card);
    }
    $('#speelveld').append($row);
  }

  this.update();
};

Game.prototype.addCard = function(card) {
  // console.log('adding card');
  if (this.firstCard == null) {
    this.firstCard = card;
    console.log('added first');
    card.setState('active');
    card.lock();
  }
  if (this.firstCard != null && this.secondCard == null && !card.equals(this.firstCard)) {
    this.secondCard = card;
    console.log('added second');
    card.setState('active');
    card.lock();
    if (this.secondCard.letter == this.firstCard.letter) {
      console.log('MATCH');
      this.firstCard.setState('found');
      this.secondCard.setState('found');
    } else {
      console.log('NO MATCH');
      console.log(this.firstCard, this.secondCard);
      // this.firstCard.setState('active');
      // this.secondCard.setState('active');
      var flipMoment = new Date();
      flipMoment.setSeconds(flipMoment.getSeconds() + 3);
      // this.firstCard.flipAt(flipMoment);
      // this.secondCard.flipAt(flipMoment);
      this.firstCard.setState('inactive', flipMoment);
      this.secondCard.setState('inactive', flipMoment);
    }
    this.firstCard = null;
    this.secondCard = null;
  }
}

Game.prototype.update = function() {
  var game = this;
  setTimeout(function() {
    var now = new Date();
    game.render();
    game.update();
  }, 10);
};

Game.prototype.render = function() {
  for (var i = 0; i < this.board.cards.length; i++) {
    var card = this.board.cards[i];
    card.render();
  }
  // if (this.firstCard != null) {
  //   this.firstCard.render();
  // }
  // if (this.secondCard != null) {
  //   this.secondCard.render();
  // }
};
