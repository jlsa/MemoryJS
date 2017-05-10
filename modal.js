function Modal() {
  this.show = function(txt) {
    $('#modal-body #txt').text(txt);
    $('#myModal').show();
  }

  this.hide = function() {
    $('#myModal').hide();
  }
}
