function Game(settings) {
  this.init;
  this.board;
  this.settings = settings;
  this.init();
  this.firstCard;
  this.secondCard;
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
  this.render();
};

Game.prototype.start = function() {

};

Game.prototype.update = function() {
  var game = this;
  setTimeout(function() {
    game.render();
    game.update();
  }, 1);
};

Game.prototype.render = function() {
  // $('#speelveld').empty();
  // console.log('render');

};
