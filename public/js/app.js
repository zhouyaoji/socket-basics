var socket = io();

socket.on('connect', function() {
  console.log("Connected!");
});
socket.on('message', function(message) {
  var momentTimestamp = moment.utc(message.timestamp); 
  console.log("New message:");
  console.log(message.user);
  console.log(message.text);
  console.log(message.time);
  
  jQuery('.messages').append("<p>[" + momentTimestamp.local().format('h:mm a') + "] &nbsp;<b>" + message.user + ":</b> " + message.text + "</p>");
});
  socket.on('welcome', function(message) {
    var momentTimestamp = moment.utc(message.timestamp); 
    jQuery(".messages").append("<p>[" + momentTimestamp.local().format('h:mm a') + "] <strong>&nbsp;" + message.text + "</strong></p>");
});

// Handles submitting of new message.
var $form = jQuery('#message-form');

$form.on('submit', function(ev) {
  ev.preventDefault();     
  
  var $message = $form.find('input[name="message"]');
  var $user = $form.find('input[name="username"]');
  socket.emit('message', {
    user: $user.val(),
    text: $message.val(),
    timestamp: moment().valueOf()
  });
  $message.val("");
});


