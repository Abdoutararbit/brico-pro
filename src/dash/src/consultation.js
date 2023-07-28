import React, { useEffect, useState } from "react";
import axios from "axios";

import { Image } from "react-bootstrap";
import {
  Row,
  Col,
  Table,
  Form,
  Button,
  InputGroup,
  Modal,
} from "react-bootstrap";

import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const UserTable = () => {
  // Static data
  const user = {
    id: 1,
    image: "user1.jpg",
    username: "JohnDoe",
    comments: [
      {
        photo: "comment1.jpg",
        text: "Great post!",
        date: "2023-05-29",
      },
      {
        photo: "comment2.jpg",
        text: "I agree with you.",
        date: "2023-05-28",
      },
    ],
    publications: [
      {
        photo: "publication1.jpg",
        text: "Check out my new article.",
        date: "2023-05-26",
      },
      {
        photo: "publication2.jpg",
        text: "Excited to share my latest project.",
        date: "2023-05-25",
      },
    ],
  };
  // const { id } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { id } = useParams();
  const avatar = queryParams.get("avatar");
  const username = queryParams.get("username");

  console.log("hhhhhhhhhhhhhhhhhhh", id);
  /////////////////////////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteProfile = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/deleteprofil?idU=${id}`
      );
      console.log(response.data.message);
      if (response) {
        window.location.href = `/Dash`;
      }
    } catch (error) {
      console.log("Error deleting profile");
    }
  };

  const [userComments, setUserComments] = useState([]);
  const [userPublications, setUserPublications] = useState([]);
  const [userPhotos, setUserPhotos] = useState([]);
  useEffect(() => {
    const fetchUserPublications = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:5000/getUserPhotos?id=${id}`
        );
        setUserPhotos(response.data.userPhotos);
        setUserPublications(response.data.userPhotos);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch user comments and publications", error);
      }
    };

    fetchUserPublications();
  }, []);

  useEffect(() => {
    const fetchUserCommentsAndPublications = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:5000/getUserCommentsAndPublications?id=${id}`
        );
        setUserComments(response.data.userComments);
        //  setUserPublications(response.data.userPhotos);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch user comments and publications", error);
      }
    };

    fetchUserCommentsAndPublications();
  }, []);

  return (
    <div className="App">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top">
        <Container fluid>
          <Navbar.Brand href="#home">Elmida-admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end">
            <Nav>
              <Nav.Link
                eventKey={2}
                onClick={() => {
                  window.location.href = `/`;
                }}>
                Deconnection <Badge bg="warning"></Badge>
                <span className="visually-hidden">unread messages</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="my-3">
        <Table bordered variant="dark">
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>
                <img
                  src={`http://127.0.0.1:5000/${avatar}`}
                  alt={`user picture`}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "60px",
                  }}
                />
              </td>
              <td style={{ width: "40%", verticalAlign: "middle" }}>
                {username}
              </td>
              <td style={{ width: "30%", textAlign: "center" }}>
                <Button
                  variant="info"
                  onClick={() => {
                    handleShow();
                  }}>
                  supprimer l'utilisateur
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>

      <Container fluid>
        <Table bordered variant="dark">
          <thead>
            <tr>
              <th>Comments</th>
              <th>Comment Date</th>
              <th>Publications</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: "25%" }}>
                <ul>
                  {userComments?.map((comment, index) => (
                    <li key={index}>
                      <span>{comment.comment}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td style={{ width: "25%" }}>
                <ul>
                  {userComments?.map((comment, index) => (
                    <li key={index}>{comment.date}</li>
                  ))}
                </ul>
              </td>
              <td style={{ width: "25%" }}>
                {userPhotos?.map((photo, index) => (
                  <ul key={index}>
                    <li>
                      <img
                        src={`http://127.0.0.1:5000/${photo}`}
                        alt={`photo ${index + 1}`}
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "5px",
                        }}
                      />
                    </li>
                  </ul>
                ))}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>vous les vous vraiment supprimer cet user</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteProfile}>
            oui
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;
