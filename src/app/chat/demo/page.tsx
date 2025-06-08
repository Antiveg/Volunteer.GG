"use client"; // This directive is essential for client-side interactivity

import React, { useState, FormEvent, useRef, useEffect } from 'react';

interface DemoMessage {
  id: string;
  text: string;
  sender: 'user' | 'organization';
  timestamp: string;
}

const ORGANIZATION_FIXED_RESPONSE = "[response]"; // The organization's canned response

export default function UniversalDemoChatPage() {
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null); // For auto-scrolling

  // Auto-scroll to the bottom of the messages list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Add an initial welcome message when the component mounts
  useEffect(() => {
    setMessages([
      {
        id: `org-welcome-${Date.now()}`,
        text: "Welcome to the Demo Chat! Send any message to see the organization's fixed response.",
        sender: 'organization',
        timestamp: new Date().toISOString(),
      }
    ]);
  }, []); // Empty dependency array ensures this runs only once on mount


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputText.trim()) return; // Do nothing if input is empty

    const userMessageText = inputText.trim();
    
    const userMessage: DemoMessage = {
      id: `user-${Date.now()}`,
      text: userMessageText,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    // Simulate a slight delay for the organization's response for better demo feel
    setTimeout(() => {
      const organizationResponse: DemoMessage = {
        id: `org-${Date.now() + 1}`, // Ensure unique ID
        text: ORGANIZATION_FIXED_RESPONSE,
        sender: 'organization',
        timestamp: new Date(Date.now() + 1).toISOString(), // Slightly later timestamp
      };
      setMessages(prevMessages => [...prevMessages, organizationResponse]);
    }, 500); // 500ms delay

    // Add user's message immediately
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText(''); // Clear input field
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 40px)', maxWidth: '700px', margin: '20px auto', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', fontFamily: 'Arial, sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ padding: '15px 20px', margin: '0', borderBottom: '1px solid #eee', backgroundColor: '#f0f0f0', color: '#333', textAlign: 'center', fontSize: '1.2em' }}>
        Demo Organization Chat
      </h2>
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fff' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#007bff' : '#e9ecef',
              color: msg.sender === 'user' ? 'white' : '#333',
              padding: '10px 15px',
              borderRadius: msg.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
              maxWidth: '75%',
              wordBreak: 'break-word',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            <p style={{ margin: 0, fontSize: '0.95em', lineHeight: '1.4' }}>{msg.text}</p>
            <p style={{ margin: '5px 0 0', fontSize: '0.7em', textAlign: msg.sender === 'user' ? 'right' : 'left', opacity: 0.6, color: msg.sender === 'user' ? '#f0f0f0' : '#555' }}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Element to scroll to */}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', padding: '15px', borderTop: '1px solid #eee', backgroundColor: '#f0f0f0' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          style={{ flexGrow: 1, padding: '12px 15px', border: '1px solid #ccc', borderRadius: '25px', marginRight: '10px', fontSize: '0.95em' }}
        />
        <button type="submit" style={{ padding: '12px 20px', borderRadius: '25px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.95em', fontWeight: 'bold' }}>
          Send
        </button>
      </form>
    </div>
  );
}