var name = getQueryVariable('name') || "Anonymous";
var room = getQueryVariable('room') || "General";
var socket = io();

jQuery('.room-title').text("Room: " + room);

socket.on('connect', function() {
  console.log("Connected!");
  console.log(name + " is in " + room);
  socket.emit('joinRoom', {
     name: name,
     room: room
   });
});
socket.on('message', function(message) {
  var momentTimestamp = moment.utc(message.timestamp); 
  console.log("New message:");
  console.log(message.user);
  console.log(message.text);
  console.log(message.time);
  var $messages = jQuery('.messages');
  var $message = jQuery('<li class="list-group-item"></li>');
  $message.append("<p><strong>&nbsp;" + message.name + ' ' +  momentTimestamp.local().format('h:mm a') + "</strong></p>")
  $message.append("<p>&nbsp;" + message.text + "</p>");
  $messages.append($message);
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
