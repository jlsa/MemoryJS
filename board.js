function Board() {
  this.cards = [];
  this.boardSize = 6;
}

Board.prototype.init = function(settings) {
  this.settings = settings;
  this.boardSize = settings.boardSize;
  this.cards = [this.boardSize * this.boardSize];
  for (var y = 0; y < this.boardSize; y++) {
    for (var x = 0; x < this.boardSize; x++) {
      var i = y * this.boardSize + x;
      var card = new Card(x, y, settings.defaultChar, settings.board[i]);
      card.activeColor = settings.activeColor;
      card.inactiveColor = settings.inactiveColor;
      card.foundColor = settings.foundColor;

      this.cards[i] = card;
    }
  }
  // console.log(this.cards);
};

Board.prototype.getCard = function(x, y) {
  return this.cards[y * this.boardSize + x];
};
