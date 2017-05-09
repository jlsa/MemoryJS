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
  this.displayChar(this.letter);//defaultChar);
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

// Card.prototype.forceState = function(nextState) {
//   this.state = nextState;
//   this.lastState = 'active';
// };
//
// Card.prototype.flip = function() {
//   // console.log('need to flip card ', this.x, this.y, this.letter);
//   // if (this.state == 'inactive') {
//   //   // display backside of card
//   //   this.changeColor(this.inactiveColor);
//   //   this.displayChar(this.defaultChar);
//   //   this.unlock();
//   // } else if (this.state == 'active') {
//   //   // display front side of card without found
//   //   this.changeColor(this.activeColor);
//   //   this.displayChar(this.letter);
//   //   this.lock();
//   // } else if (this.state == 'found') {
//   //   // display found
//   //   this.changeColor(this.foundColor);
//   //   this.displayChar(this.letter);
//   //   // lets lock it so we make sure it doesnt get clicked on again
//   //   this.lock();
//   // }
// };
// //
// // Card.prototype.flipAt = function(moment) {
// //   this.flipAtMoment = moment;
// // }
//
Card.prototype.render = function() {}
//   // if (this.lastState != this.state) {
//   //   // console.log(this.lastState, this.state);
//   //   // we have a transition going on
//   //   if (this.lastState == 'inactive' && this.state == 'active') {
//   //     // transition from inactive to active
//   //     this.flip();
//   //     this.lastState = 'active'; // lets make sure we dont continue to flip through the states
//   //   }
//   //   if (this.lastState == 'active' && this.state == 'inactive') {
//   //     this.flip();
//   //     this.lastState = 'inactive';
//   //   }
//   //   if (this.lastState == 'active' && this.state == 'found') {
//   //     this.flip();
//   //     this.lastState = 'found';
//   //   }
//   // }
// }

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
