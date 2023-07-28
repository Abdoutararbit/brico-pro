import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/config";
import { Row, Col, Form, Button, Nav, Table } from "react-bootstrap";
import "../bootstrap/bootstrap-5.0.2-dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
const ProfileUser = () => {
  const { id } = useParams();
  const userId = sessionStorage.getItem("userId");
  const isCurrentUserProfile = id === userId;
  console.log(isCurrentUserProfile);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

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
    try {
      // Send a request to your backend API to cancel the project
      const response = await axios.put(`/api/projects/${projectId}/cancel`);
      // Assuming the backend responds with the updated project data
      // You can update the user's requestedProjects state or perform any other necessary updates
      console.log("Project canceled:", response.data);
    } catch (error) {
      console.error("Error canceling project:", error);
    }
  };
  const renderTabContent = () => {
    if (activeTab === "projects") {
      return (
        <div>
          <h4>Projects Demander:</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.requestedProjects.map((project) => (
                <tr key={project._id}>
                  <td>{project.subject}</td>
                  <td>{project.description}</td>
                  <td>
                    {project.status === "pending" ? (
                      <>
                        {isCurrentUserProfile ? (
                          <Button
                            variant="outline-danger"
                            onClick={() => handleCancelProject(project._id)}
                          >
                            Annuler Project
                          </Button>
                        ) : (
                          <p
                            style={{
                              color: "blue",
                            }}
                          >
                            {project.status}
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
                        {project.status}
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
          <h2>Edit Profile</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="small">Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="small">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Add additional form fields for other user properties */}
            <Button variant="outline-primary" onClick={handleSaveClick}>
              Save
            </Button>
          </Form>
        </div>
      );
    } else {
      return (
        <div>
          <h6>User Profile</h6>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Display other user properties as needed */}
          <>
            {isCurrentUserProfile && (
              <>
                <Button variant="outline-primary" onClick={handleEditClick}>
                  Edit
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
        <br></br>
      </div>
      {user ? (
        <div>
          <div className="main-body">
            {/* /Breadcrumb */}
            <Row className="gutters-sm">
              <Col md="4" className="mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src={`${API_URL}/${user.picture}`}
                        alt={user.username}
                        className="rounded-circle"
                        width="220"
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
                              <button className="btn btn-outline-primary">
                                Follow
                              </button>

                              <button
                                className="btn btn-outline-primary"
                                onClick={() => navigate("/Discussion")}
                              >
                                Messagerie
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
                      <h6 className="mb-0">Website</h6>
                      <span className="text-secondary">{user.website}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">GitHub</h6>
                      <span className="text-secondary">{user.github}</span>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md="8">
                <div className="card h-100">
                  <div className="card-body">
                    <Nav variant="tabs" defaultActiveKey="profile">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="profile"
                          onClick={() => handleTabChange("profile")}
                        >
                          Profile
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="projects"
                          onClick={() => handleTabChange("projects")}
                        >
                          Projects
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
    </div>
  );
};

export default ProfileUser;
