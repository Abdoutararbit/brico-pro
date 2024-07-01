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
import moment from "moment";
import { API_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
const Discussionprofessional = () => {
  const [discussions, setDiscussions] = useState([]);
  const [userdiscussions, setuserDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date()); // Nouvel état pour stocker l'heure actuelle
  const navigate = useNavigate();

  const [connected, setConnected] = useState("");

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/profilusers/${id}`);
      setConnected(response.data);
      console.log("connected user", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // Fetch discussions for the user from the server on component mount
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

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      // If userId is not available, navigate to the login page
      navigate("/");
      return;
    }
    fetchUser(userId);
    const professionalId = userId;
    console.log(professionalId);
    axios
      .get(`${API_URL}/getProfessionalDiscussions/${professionalId}`) // Replace "userId" with the actual user ID
      .then((response) => {
        console.log(response.data);
        setDiscussions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching discussions:", error);
      });
  }, [navigate]);
  //////////////////////////////////////

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
        setuserDiscussions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching discussions:", error);
      });
  }, [navigate]);

  ////////////////////////

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

  // ...
  const handleSendMessage = () => {
    if (!newMessage.trim() && !selectedPhoto) return;

    const formData = new FormData();
    formData.append("sender", connected.username);
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
  //////////////////////////////////////////
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (selectedDiscussion) {
      const discussionId = selectedDiscussion._id;

      const fetchNewMessages = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/getMessages/${discussionId}`
          );
          const newMessages = response.data.filter(
            (message) => message.sender !== connected.username
          );

          if (newMessages.length > 0) {
            if ("Notification" in window) {
              Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                  newMessages.forEach((message) => {
                    new Notification("New Message", {
                      body: `${message.sender}: ${message.content}`,
                      icon: `${API_URL}/${message.photoUrl}`,
                    });
                  });
                }
              });
            }
          }
        } catch (error) {
          console.error("Error fetching new messages:", error);
        }
      };

      const interval = setInterval(fetchNewMessages, 5000); // Check for new messages every 5 seconds

      return () => clearInterval(interval);
    }
  }, [selectedDiscussion, connected.username]);

  return (
    <div>
      <div>
        <Header />
      </div>
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <Row>
        <Col sm={4}>
          <h2 className="chat-header">Discussions</h2>
          <ListGroup className="khlifa">
            <div>
              {userdiscussions?.map((discussion) => (
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
                    src={`${API_URL}/${discussion.user.picture}`}
                    alt="Avatar"
                    roundedCircle
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                      border: "1px solid black",
                    }} // Adjust the spacing between the image and the email
                  />
                  {discussion.professional.email}
                </ListGroup.Item>
              ))}
            </div>
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
                  src={`${API_URL}/${discussion.user.picture}`}
                  alt="Avatar"
                  roundedCircle
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }} // Adjust the spacing between the image and the email
                />
                {discussion.user.email}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col sm={8}>
          {selectedDiscussion ? (
            <>
              <div className="messages-container">
                <h1 className="chat-header1">Chat Room</h1>
                <div className="chat-messages">
                  <ListGroup className="khlifa">
                    {messages.map((message) => (
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
            backgroundColor: "#1877F2",
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
          backgroundColor: "#1877F2",
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

export default Discussionprofessional;
