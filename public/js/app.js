var socket = io();

socket.on('connect', function(resp) {
  console.log("Connected to socket.io server!");
  console.log(resp);
});
