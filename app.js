// Import React hooks for state and lifecycle management
import { useEffect, useState } from 'react';
// Import the client-side Socket.IO library
import { io } from 'socket.io-client';

// Create a socket connection to the backend server
const socket = io('http://localhost:4000');

function App() {
  // Local state to store the document content
  const [content, setContent] = useState('');

  useEffect(() => {
    // Listen for the server's initial document load and update the content
    socket.on('load-document', (doc) => setContent(doc));
    // Listen for any updates from other users and update our content
    socket.on('document-updated', (newContent) => setContent(newContent));
    
    // Clean up event listeners when the component unmounts
    return () => {
      socket.off('load-document');
      socket.off('document-updated');
    };
  }, []);

  // Called whenever the user types into the textarea
  const handleChange = (e) => {
    const newValue = e.target.value;
    // Update local state with new content
    setContent(newValue);
    // Send updated content to the server so other clients can receive it
    socket.emit('update-document', newValue);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 Collaborative Document Editor</h1>
      <textarea
        style={{ width: '100%', height: '70vh', padding: '1rem', fontSize: '1.2rem' }}
        value={content}
        onChange={handleChange}
      />
    </div>
  );
}

