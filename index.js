const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Inicjalizacja aplikacji
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Ustawienie portu
const PORT = 3000;

// Obsługa trasy głównej
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log("otwarto w przegladarce");
});

// Obsługa połączeń Socket.IO
io.on('connection', (socket) => {
  console.log("Socket - połączenie klienta.");

  // Obsługa wiadomości od klienta
  socket.on('message', (msg) => {
    console.log(`Otrzymano wiadomość: ${msg}`);
    io.emit('message', msg);
  });

 
});

// Uruchomienie serwera
server.listen(PORT, () => {
  console.log(`Serwer nasłuchuje na porcie ${PORT}`);
});
