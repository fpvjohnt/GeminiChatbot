import React, { useState } from 'react';
import { getGeminiResponse } from './ApiService';

const ChatInterface = () => {
  const [userInput, setUserInput] = useState('');
  const [threads, setThreads] = useState([[]]);

  const commonFontStyle = {
    fontFamily: 'Roboto, sans-serif',
  };

  const sidebarStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: '250px',
    overflowY: 'auto',
    ...commonFontStyle,
  };

  const chatBoxStyle = {
    position: 'fixed',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%', // Adjust width as needed
    maxWidth: '600px', // Maximum width, adjust as needed
    ...commonFontStyle,
  };

  const inputStyle = {
    flexGrow: 1,
    height: '40px',
    borderRadius: '20px',
    padding: '0 15px',
    border: '1px solid #ccc',
    ...commonFontStyle,
  };

  const buttonStyle = {
    width: '40px',
    height: '40px',
    border: 'none',
    borderRadius: '20px', // Adjust for rounded corners
    cursor: 'pointer',
    marginLeft: '10px',
    ...commonFontStyle,
  };

  const conversationStyle = {
    position: 'absolute',
    top: '20px', // Space from the top, adjust as needed
    left: '250px', // Offset by the width of the sidebar
    right: '10px', // Space from the right, adjust as needed
    paddingLeft: '20px', // Padding inside the conversation area
    ...commonFontStyle,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      let newThreads = [...threads];
      let currentThread = newThreads[newThreads.length - 1];

      currentThread.push({ type: 'user', text: userInput });
      setUserInput('');

      try {
        const response = await getGeminiResponse(userInput, null);
        currentThread.push({ type: 'gemini', text: response });
      } catch (error) {
        currentThread.push({ type: 'error', text: 'Failed to get a response.' });
      }

      setThreads(newThreads);
    }
  };

  return (
    <>
      <div style={sidebarStyle}>
        {threads.map((thread, index) => (
          thread[0] && thread[0].type === 'user' && 
          <div key={`query-${index}`}>{thread[0].text}</div>
        ))}
      </div>
      <div style={chatBoxStyle}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message here..."
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Send</button>
        </form>
      </div>
      <div style={conversationStyle}>
        {threads.map((thread, threadIndex) => (
          <div key={`thread-${threadIndex}`}>
            {thread.map((message, msgIndex) => (
              <div key={`message-${threadIndex}-${msgIndex}`} style={{ color: message.type === 'gemini' ? 'rebeccapurple' : 'green' }}>
                {message.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatInterface;
