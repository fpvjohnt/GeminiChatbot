import React, { useState, useEffect } from 'react';
import { fetchHelloMessage } from './ApiService';
import ChatInterface from './ChatInterface';

function App() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      setIsLoading(true);
      const fetchedMessage = await fetchHelloMessage();
      if (fetchedMessage) {
        setMessage(fetchedMessage);
      } else {
        setError('Failed to fetch message');
      }
      setIsLoading(false);
    };

    getMessage();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{message}</h1>
      <ChatInterface />
    </div>
  );
}

export default App;
