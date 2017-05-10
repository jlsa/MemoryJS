function Card(x, y, defaultChar, letter) {
  this.locked = false;
  this.x = x;
  this.y = y;
  this.defaultChar = defaultChar;
  this.letter = letter;
  this.state = 'inactive'; // inactive, active & found
  this.lastState = 'inactive';
  this.displayObj = null;

  this.activeColor;
  this.inactiveColor;
  this.foundColor;
};

Card.prototype.show = function() {
  this.changeColor(this.activeColor);
  this.displayChar(this.letter);
  this.lock();
}

Card.prototype.hide = function() {
  this.changeColor(this.inactiveColor);
  this.displayChar(this.defaultChar);
  this.unlock();
}
Card.prototype.found = function() {
  this.changeColor(this.foundColor);
  this.displayChar(this.letter);
  this.lock();
}

Card.prototype.setState = function(newState, flipMoment) {
  if (this.state == 'found') {
    return;
  }
  this.state = newState;
  if (newState == 'inactive') {
    this.hide();
  }

  if (newState == 'active') {
    this.show();
  }

  if (newState == 'found') {
    this.found();
  }

  this.lastState = this.state;
  this.state = newState;
};

Card.prototype.render = function() {}

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

Card.prototype.getX = function() {
  return this.x;
}

Card.prototype.getY = function() {
  return this.y;
}

Card.prototype.getLetter = function() {
  return this.letter;
}

Card.prototype.equals = function(other) {
  if (this.x != other.getX()) return false;
  if (this.y != other.getY()) return false;
  if (this.letter != other.getLetter()) return false;
  return true;
}
