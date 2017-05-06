function Card(x, y, defaultChar, letter) {
  this.locked = false;
  this.x = x;
  this.y = y;
  this.defaultChar = defaultChar;
  this.letter = letter;
  this.state = 'inactive'; // inactive, active & found
  this.displayObj = null;

  this.activeColor;
  this.inactiveColor;
  this.foundColor;
  // console.log('created: ', x, y, letter);
};

Card.prototype.setState = function(newState) {
  if (this.isLocked()) {
    return;
  }
  this.state = newState;
  console.log('new state', newState);
  this.flip();
};

Card.prototype.flip = function() {
  console.log('need to flip card ', this.x, this.y, this.letter);
  if (this.state == 'inactive') {
    // display backside of card
    this.changeColor(this.inactiveColor);
    this.displayChar(this.defaultChar);
    this.unlock();
  } else if (this.state == 'active') {
    // display front side of card without found
    this.changeColor(this.activeColor);
    this.displayChar(this.letter);
    this.lock();
  } else if (this.state == 'found') {
    // display found
    this.changeColor(this.foundColor);
    this.displayChar(this.letter);
    // lets lock it so we make sure it doesnt get clicked on again
    this.lock();
  }
};

Card.prototype.changeColor = function(color) {
  $(this.displayObj).css('background-color', '#' + color);
};

Card.prototype.displayChar = function(char) {
  $(this.displayObj).text(char);
};

Card.prototype.reset = function() {
  // unlock after setState;
  this.setState('inactive');
  this.unlock();
}

Card.prototype.lock = function() {
  this.locked = true;
}

Card.prototype.unlock = function() {
  this.locked = false;
}

Card.prototype.isLocked = function() {
  return this.locked;
}
