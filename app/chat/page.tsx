"use client"

import { useEffect, useState, useRef } from "react";
import AC from "agora-chat";

export default function page() {
  // Replaces <Your app key> with your app key.
  const appKey = "611117266#1300450";
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [peerId, setPeerId] = useState("");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState([]);
  const chatClient = useRef(null);

  // Logs into Agora Chat.
  const handleLogin = () => {
    if (userId && token) {
      chatClient.current?.open({
        user: userId,
        // Use agoraToken for v1.2.1 and earlier, but accessToken for 1.2.2 and later.
        accessToken: token,
      });
    } else {
      addLog("Please enter userId and token");
    }
  };

  // Logs out.
  const handleLogout = () => {
    chatClient.current?.close();
    setIsLoggedIn(false);
    setUserId("");
    setToken("");
    setPeerId("");
  };

  // Sends a peer-to-peer message.
  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const option = {
          chatType: "singleChat", // Sets the chat type as a one-to-one chat.
          type: "txt", // Sets the message type.
          to: peerId, // Sets the recipient of the message with user ID.
          msg: message, // Sets the message content.
        };
        let msg = AC.message.create(option);

        await chatClient.current.send(msg);
        addLog(`Message send to ${peerId}: ${message}`);
        setMessage("");
      } catch (error) {
        addLog(`Message send failed: ${error.message}`);
      }
    } else {
      addLog("Please enter message content");
    }
  };

  // Add log.
  const addLog = (log) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  useEffect(() => {
    // Initializes the Web client.
    chatClient.current = new AC.connection({
      appKey: appKey,
    });

    // Adds the event handler.
    chatClient.current.addEventHandler("connection&message", {
      // Occurs when the app is connected to Agora Chat.
      onConnected: () => {
        setIsLoggedIn(true);
        addLog(`User ${userId} Connect success !`);
      },
      // Occurs when the app is disconnected from Agora Chat.
      onDisconnected: () => {
        setIsLoggedIn(false);
        addLog(`User Logout!`);
      },
      // Occurs when a text message is received.
      onTextMessage: (message) => {
        addLog(`${message.from}: ${message.msg}`);
      },
      // Occurs when the token is about to expire.
      onTokenWillExpire: () => {
        addLog("Token is about to expire");
      },
      // Occurs when the token has expired.
      onTokenExpired: () => {
        addLog("Token has expired");
      },
      onError: (error) => {
        addLog(`on error: ${error.message}`);
      },
    });
  }, []);

  return (
    <>
      <div
        style={{
          width: "500px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <h2>Agora Chat Examples</h2>
        {!isLoggedIn ? (
          <>
            <div>
              <label>UserID: </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter the user ID"
              />
            </div>
            <div>
              <label>Token: </label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter the token"
              />
            </div>
            <button onClick={handleLogin}>Login</button>
          </>
        ) : (
          <>
            <h3>Welcome, {userId}</h3>
            <button onClick={handleLogout}>Logout</button>
            <div>
              <label>Peer userID: </label>
              <input
                type="text"
                value={peerId}
                onChange={(e) => setPeerId(e.target.value)}
                placeholder="Enter the peer user ID"
              />
            </div>
            <div>
              <label>Peer message: </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Input message"
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        )}

        <h3>Operation log</h3>
        <div
          style={{
            height: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            textAlign: "left",
          }}
        >
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </>
  );
}
