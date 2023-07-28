import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, ListGroup, Form, Button, Image } from "react-bootstrap";
import { API_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Discussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      navigate("/");
      return;
    }
    axios
      .get(`${API_URL}/getUserDiscussions/${userId}`)
      .then((response) => {
        setDiscussions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching discussions:", error);
      });
  }, [navigate]);

  useEffect(() => {
    if (selectedDiscussion) {
      axios
        .get(`${API_URL}/getMessages/${selectedDiscussion._id}`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [selectedDiscussion]);

  const handleDiscussionClick = (discussion) => {
    setSelectedDiscussion(discussion);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    axios
      .post(`${API_URL}/addMessage?discussionId=${selectedDiscussion._id}`, {
        sender: `${selectedDiscussion.user.username}`, // Replace "User" with the sender's name
        content: newMessage.trim(),
      })
      .then((response) => {
        setMessages([...messages, response.data]);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div>
      <div className="header-fixed">
        {/* Utilisez la classe pour rendre le header fixe */}
        <Header />
      </div>
      <Row>
        <Col sm={4}>
          {/* Discussions */}
          <div className="chat-container">
            <div className="chat-header">Discussions</div>

            <ListGroup>
              {discussions?.map((discussion) => (
                <ListGroup.Item
                  key={discussion._id}
                  active={
                    selectedDiscussion &&
                    selectedDiscussion._id === discussion._id
                  }
                  action
                  onClick={() => handleDiscussionClick(discussion)}
                >
                  <Image
                    src={`${API_URL}/${discussion.professional.picture}`}
                    alt="Avatar"
                    roundedCircle
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  {discussion.professional.email}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
        <Col md={6}>
          <div className="chat-container">
            <div className="chat-header">Chat Room</div>
            <div className="chat-messages">
              {selectedDiscussion ? (
                <>
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`chat-message ${
                        message.sender === "User" ? "chat-message-user" : ""
                      }`}
                    >
                      <div className="chat-message-sender">
                        {message.sender}
                      </div>
                      <div className="chat-message-content">
                        {message.content}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p>Select a discussion to view messages.</p>
              )}
            </div>
            {selectedDiscussion && (
              <div className="chat-input">
                <Form.Control
                  className="chat-input"
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button variant="primary" onClick={handleSendMessage}>
                  Send
                </Button>
              </div>
            )}
          </div>
        </Col>
        <style>
          {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
          }

          .chat-container {
            margin: 40px auto;
            max-width: 600px;
            background-color: #fff;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .chat-header {
            padding: 16px;
            background-color: #3ab879;
            color: #fff;
            font-size: 18px;
            font-weight: 600;
            border-radius: 6px 6px 0 0;
          }

          .chat-messages {
            max-height: 400px;
            overflow-y: auto;
            padding: 12px;
            
          }

          .chat-message {
            margin-bottom: 12px;
            padding: 8px;
            border-radius: 6px;
            background-color: #f5f5f5;
          }

          .chat-message-user {
            text-align: right;
            background-color: #d1eefc;
          }

          .chat-message-sender {
            font-weight: 600;
            margin-bottom: 4px;
          }

          .chat-message-content {
            margin: 0;
          }

          .chat-input {
            display: flex;
            margin-top: 12px;
            border-top: 1px solid #ddd;
            padding-top: 12px;
          }

          .chat-input input {
            flex: 1;
            padding: 8px 12px;
            border: none;
            border-radius: 6px;
          }

          .chat-input button {
            background-color: #3ab879;
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 8px 16px;
            margin-left: 8px;
          }
        `}
        </style>
      </Row>
    </div>
  );
};

export default Discussion;
