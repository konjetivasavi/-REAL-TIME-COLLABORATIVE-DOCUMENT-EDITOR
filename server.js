// Import required packages
const express = require('express');      // Express.js web server
const http = require('http');            // HTTP module to create a server
const { Server } = require('socket.io'); // Socket.IO for real-time communication
const mongoose = require('mongoose');    // Mongoose for MongoDB interactions

// Define a schema for the Document in MongoDB
const DocumentSchema = new mongoose.Schema({ content: String });
// Create the Document model from the schema
const Document = mongoose.model('Document', DocumentSchema);

// Connect to the MongoDB database named "realtime-editor"
mongoose.connect('mongodb://localhost:27017/realtime-editor');

// Create an Express app
const app = express();
// Wrap the app with an HTTP server
const server = http.createServer(app);
// Set up a new Socket.IO server allowing all CORS origins
const io = new Server(server, { cors: { origin: '*' } });

// Listen for new client connections
io.on('connection', async (socket) => {
  // Fetch the first existing document or create a blank one if none exists
  let doc = await Document.findOne({});
  if (!doc) {
    doc = new Document({ content: '' });
    await doc.save();
  }

  // Send the current document content to the newly connected client
  socket.emit('load-document', doc.content);

  // Listen for updates sent by the client
  socket.on('update-document', async (newContent) => {
    // Save the new content in the database
    doc.content = newContent;
    await doc.save();
    // Broadcast the updated content to all other connected clients
    socket.broadcast.emit('document-updated', newContent);
  });
});

// Start the server on port 4000
server.listen(4000, () => console.log('Server is running on port 4000'));
