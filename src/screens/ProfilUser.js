import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/config";
import { Row, Col, Form, Button, Nav, Table } from "react-bootstrap";
import "../bootstrap/bootstrap-5.0.2-dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const ProfileUser = () => {
  const { id } = useParams();
  const userId = sessionStorage.getItem("userId");
  const isCurrentUserProfile = id === userId;
  console.log(isCurrentUserProfile);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("projects");
  const navigate = useNavigate();
  const statusTranslations = {
    accepted: "Accepté",
    canceled: "Annulé",
    rejected: "Refusé",
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/profilusers/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  const handleEditClick = () => {
    setEditing(true);
    setUpdatedUser(user); // Store a copy of the user object for editing
    setActiveTab("profile-edit");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    // Actualiser la page pour refléter les changements
    window.location.reload();
    try {
      const response = await axios.put(
        `${API_URL}/updateusers/${id}`,
        updatedUser
      );
      setUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleCancelProject = async (projectId) => {
    // Actualiser la page pour refléter les changements
    window.location.reload();
    try {
      // Send a request to your backend API to cancel the project
      const response = await axios.post(
        `${API_URL}/canceleProject?projectId=${projectId}`
      ); // Assuming the backend responds with the updated project data
      // You can update the user's requestedProjects state or perform any other necessary updates
      console.log("Project canceled:", response.data);
      console.log("Updated user's projects:", response.data);
      // Mettre à jour l'état local de l'utilisateur avec les nouveaux projets
      setUser((prevUser) => ({
        ...prevUser,
        requestedProjects: response.data.requestedProjects,
      }));
    } catch (error) {
      console.error("Error canceling project:", error);
    }
  };
  const renderTabContent = () => {
    if (activeTab === "projects") {
      return (
        <div>
          <h4>Projets Demander:</h4>
          <hr></hr>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Description</th>
                <th>Date Begin</th>
                <th>Date Finish</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.requestedProjects.map((project) => (
                <tr key={project._id}>
                  <td>{project.subject}</td>
                  <td>{project.description}</td>
                  <td>
                    {project.dateBegin
                      ? new Date(project.dateBegin).toLocaleDateString()
                      : ""}
                  </td>
                  <td>
                    {project.dateFinish
                      ? new Date(project.dateFinish).toLocaleDateString()
                      : ""}
                  </td>
                  <td>
                    {project.status === "pending" ? (
                      <>
                        {isCurrentUserProfile ? (
                          <Button
                            className="btn btn-danger btn-sm d-flex align-items-center"
                            style={{
                              padding: "3px 6px",
                              border: "3px solid white",
                              boxShadow: "2px 2px 4px rgba(255, 255, 255, 0.1)", // Ajoute une ombre douce pour un effet 3D subtil
                              borderRadius: "8px",
                              transition: "background-color 0.3s ease",
                            }}
                            onClick={() => handleCancelProject(project._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            <span className="ms-1">Annuler projet</span>
                          </Button>
                        ) : (
                          <p
                            style={{
                              color: "blue",
                            }}
                          >
                            {statusTranslations[project.status]}
                          </p>
                        )}
                      </>
                    ) : (
                      <p
                        style={{
                          color:
                            project.status === "rejected" ||
                            project.status === "canceled"
                              ? "red"
                              : project.status === "accepted"
                              ? "green"
                              : "blue",
                        }}
                      >
                        {statusTranslations[project.status]}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    } else if (activeTab === "profile-edit") {
      return (
        <div>
          <h2>modifier les Informations personnelles</h2>
          <hr></hr>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="small">Nom/prenome</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="small">E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Add additional form fields for other user properties */}
            <Button
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
              onClick={handleSaveClick}
            >
              Sauvegarder
            </Button>
          </Form>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Informations personnelles</h2>
          <p>Nom: {user.username}</p>
          <p>E-mail: {user.email}</p>
          {/* Display other user properties as needed */}
          <>
            {isCurrentUserProfile && (
              <>
                <Button
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
                  onClick={handleEditClick}
                >
                  <FontAwesomeIcon icon={faEdit} /> Modifier
                </Button>
              </>
            )}
          </>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="bg-dark text-white">
        <Header />
        {/* Your ScreenTwo content */}
      </div>
      <hr></hr>
      <hr></hr>
      <hr></hr>

      {user ? (
        <div>
          <div className="main-body">
            {/* /Breadcrumb */}
            <Row className="gutters-sm">
              <Col md="4" className="mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src={`${API_URL}/${user.picture}`}
                        alt={user.username}
                        className="rounded-circle"
                        width="220vm"
                        height="180vh"
                        style={{ cursor: "pointer", border: "2px solid black" }} // Optional: Show a pointer cursor when hovering over the image
                      />

                      <div className="mt-3">
                        <h4>{user.username}</h4>
                        <p className="text-secondary mb-1">{user.role}</p>
                        <p className="text-muted font-size-sm">
                          {user.location}
                        </p>
                        <>
                          {isCurrentUserProfile && (
                            <>
                              <button
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
                                onClick={() => navigate("/Discussion")}
                              >
                                <FontAwesomeIcon icon={faEnvelope} /> Messagerie
                              </button>
                            </>
                          )}
                        </>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mt-3">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0"> </h6>
                      <span className="text-secondary">{user.website}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0"> </h6>
                      <span className="text-secondary">{user.github}</span>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md="8">
                <div className="card h-100">
                  <div className="card-body">
                    <Nav variant="tabs" defaultActiveKey="projects">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="projects"
                          onClick={() => handleTabChange("projects")}
                          style={{
                            backgroundColor:
                              activeTab === "projects" ? "black" : "inherit",
                            color:
                              activeTab === "projects" ? "white" : "inherit",
                          }}
                        >
                          Projets
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="profile"
                          onClick={() => handleTabChange("profile")}
                          style={{
                            backgroundColor:
                              activeTab === "profile" ? "black" : "inherit",
                            color:
                              activeTab === "profile" ? "white" : "inherit",
                          }}
                        >
                          Profil
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    {renderTabContent()}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <style>
        {`
    
             
      `}
      </style>
    </div>
  );
};

export default ProfileUser;
