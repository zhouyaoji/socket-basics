var name = getQueryVariable('name') || "Anonymous";
var room = getQueryVariable('room');
var socket = io();

socket.on('connect', function() {
  console.log("Connected!");
  console.log(name + " is in " + room);
});
socket.on('message', function(message) {
  var momentTimestamp = moment.utc(message.timestamp); 
  console.log("New message:");
  console.log(message.user);
  console.log(message.text);
  console.log(message.time);
   var $message = jQuery('.messages');
   $message.append("<p><strong>&nbsp;" + message.name + ' ' +  momentTimestamp.local().format('h:mm a') + "</strong></p>")
   $message.append("<p>&nbsp;" + message.text + "</p>");
});

// Handles submitting of new message.
var $form = jQuery('#message-form');

$form.on('submit', function(ev) {
  ev.preventDefault();     
  
  var $message = $form.find('input[name="message"]');
  socket.emit('message', {
    name: name,
    text: $message.val(),
    timestamp: moment().valueOf()
  });
  $message.val("");
});


