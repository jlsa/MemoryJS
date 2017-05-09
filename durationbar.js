function DurationBar() {
  this.width = 185;
  this.running = false;

  this.reset = function() {
    this.width = 185;
  }

  this.update = function() {
    if (this.running) {
      if (this.width > 0) {
        this.width = this.width - 1;
      }
    }

    $('#timeLeft').css('width', this.width);
  }
  this.stop = function() {
    this.running = false;
  }

  this.start = function() {
    this.running = true;
  }

  this.restart = function() {
    this.stop();
    this.reset();
    this.start();
  }
}
