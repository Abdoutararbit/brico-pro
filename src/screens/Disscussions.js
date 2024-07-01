import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { API_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import moment from "moment";
const Discussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date()); // Nouvel état pour stocker l'heure actuelle

  const refetchmessages = (selectedDiscussion) => {
    axios
      .get(`${API_URL}/getMessages/${selectedDiscussion._id}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };
  // Fetch discussions for the user from the server on component mount
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      // If userId is not available, navigate to the login page
      navigate("/");
      return;
    }
    axios
      .get(`${API_URL}/getUserDiscussions/${userId}`) // Replace "userId" with the actual user ID
      .then((response) => {
        console.log(response.data);
        setDiscussions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching discussions:", error);
      });
  }, [navigate]);

  // Fetch messages for the selected discussion when it changes
  useEffect(() => {
    if (selectedDiscussion) {
      refetchmessages(selectedDiscussion);
    }
  }, [selectedDiscussion]);

  // Handle discussion click
  const handleDiscussionClick = (discussion) => {
    setSelectedDiscussion(discussion);
  };
  // Mettre à jour l'horodatage toutes les secondes (1000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Nettoyer l'intervalle lorsqu'on démonte le composant
    return () => clearInterval(interval);
  }, []);
  const handleSendMessage = () => {
    if (!newMessage.trim() && !selectedPhoto) return;

    const formData = new FormData();
    formData.append("sender", selectedDiscussion.user.username);
    formData.append("text", newMessage.trim());
    if (selectedPhoto) {
      formData.append("photo", selectedPhoto);
    }

    axios
      .post(
        `${API_URL}/addMessage?discussionId=${selectedDiscussion._id}`,
        formData
      )
      .then((response) => {
        setMessages([...messages, response.data]);
        refetchmessages(selectedDiscussion);
        setNewMessage("");
        setSelectedPhoto(null);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  //////////////////////send photo////////////////
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setSelectedPhoto(file);
  };

  return (
    <div>
      <div>
        <Header />
        <hr></hr>
        <hr></hr>
        <hr></hr>

        {/* Your ScreenTwo content */}
      </div>

      <Row>
        <Col sm={4}>
          <h2 className="chat-header">Discussions</h2>

          <ListGroup className="khlifa">
            <div>
              {discussions?.map((discussion) => (
                <ListGroup.Item
                  key={discussion._id}
                  className="chat-message"
                  active={
                    selectedDiscussion &&
                    selectedDiscussion._id === discussion._id
                  }
                  action
                  onClick={() => handleDiscussionClick(discussion)}
                >
                  <Image
                    src={`${API_URL}/${discussion.professional?.picture}`}
                    alt="Avatar"
                    roundedCircle
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                      border: "1px solid black",
                    }} // Adjust the spacing between the image and the email
                  />
                  {discussion.professional?.email}
                </ListGroup.Item>
              ))}
            </div>
          </ListGroup>
        </Col>
        <Col sm={8}>
          {selectedDiscussion ? (
            <>
              <div className="messages-container">
                <h1 className="chat-header1">Chat Room</h1>
                <div className="chat-messages">
                  <ListGroup className="khlifa">
                    {messages?.map((message) => (
                      <ListGroup.Item
                        key={message._id}
                        className="chat-message"
                      >
                        <strong className="chat-message-sender">
                          {message.sender}
                        </strong>
                        {message.content && (
                          <div className="chat-message-content">
                            {message.content}
                          </div>
                        )}

                        <div className="chat-message-timestamp">
                          {message.photoUrl && (
                            <div>
                              <img
                                src={`${API_URL}/${message.photoUrl}`}
                                alt="Message_Photo"
                                style={{
                                  maxWidth: "100%",
                                  height: "100px",
                                  width: "100px",
                                  marginTop: "10px",
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="chat-message-timestamp">
                          {message.timestamp &&
                            moment(message.timestamp).format(
                              "A MM DD YY hh:mm"
                            )}
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <div className="chat-input">
                    <Form.Control
                      className="chat-input"
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <input type="file" onChange={handlePhotoUpload} />
                    <Button
                      type="button"
                      style={{
                        backgroundColor: "#1877F2",
                        padding: "10px 20px",
                        border: "2px solid white",
                        color: "#ffffff",
                        borderRadius: "8px",
                        boxShadow: "4px 4px 6px rgba(8, 0, 0, 0.2)",
                        textDecoration: "none",
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={handleSendMessage}
                    >
                      Envoyer
                    </Button>
                  </div>
                </div>
              </div>
              <Form>
                <div controlId="newMessage" className="chat-input"></div>
              </Form>
            </>
          ) : (
            <p>Select a discussion to view messages.</p>
          )}
        </Col>
      </Row>

      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
          }
           h2,h1 {
          text-align: center;
         }

          .chat-container {
            margin: 40px auto;
            max-width: 600px;
            background-color: #319795;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .chat-header {
             height: 10vh;
            border: 2px solid black;
            background-color: #319795;  
            box-shadow: 4px 4px 6px rgba(8, 0, 0, 0.1);  
            text-decoration: none;  
            border-radius: 10px;  
            transition: background-color 0.3s ease;  
          }
          .chat-header1{
            height: 10vh;
            border: 2px solid black;
            background-color: #319795;  
            box-shadow: 4px 4px 6px rgba(8, 0, 0, 0.1);  
            text-decoration: none;  
            border-radius: 10px;  
            transition: background-color 0.3s ease;

          }
          .khlifa{ max-height: 330px;
            overflow-y: auto;}
          .chat-messages {
             padding: 12px;
            background-color: white;  
            border-radius: 20px;  
 
          }

          .chat-message {
            margin-bottom: 8px;
            padding: 8px;  
            border-radius: 20px;
            box-shadow: 4px 4px 6px rgba(8, 0, 0, 0.1);  
  
          }

          .chat-message-user {
            text-align: right;
            background-color: #d1eefc;
          }

             .chat-message-content {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #ccc;
          }
         .chat-message-sender {
            font-weight: bold;
            color: black;  
          }
           .chat-message-timestamp {
            color: #888;
            font-size: 12px;
          }

           .chat-input {
            display: flex;
            margin-top: 12px;
            border-top: 1px solid #ddd;
            padding-top: 12px;
            border-radius: 6px;

          }

          .chat-input input {
            flex: 1;
            padding: 8px 12px;
            border: none;
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
    </div>
  );
};

export default Discussion;
