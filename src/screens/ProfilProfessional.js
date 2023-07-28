import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/config";
import StarRating from "../components/StarRating";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Card,
  Table,
} from "react-bootstrap";
import "../bootstrap/bootstrap-5.0.2-dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import MyModal from "../components/Mymodal";
import { calculateAverageRating } from "../utils/rating";
const ProfilProfessional = () => {
  const { id } = useParams();
  const userId = sessionStorage.getItem("userId");
  const isCurrentUserProfile = id === userId;
  console.log(isCurrentUserProfile);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const [updatedUser, setUpdatedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [managedProjects, setManagedProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("connected id", userId);
    console.log("profil du prestataire", id);
    // Condition to check if the id of the profile user matches the id of the connected user

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/profilusers/${id}`);
        setUser(response.data);
        setManagedProjects(response.data.managedProjects);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  /////////////ratings//////////////
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setSubmitted(false); // Reset submitted status when the rating changes
  };

  const handleSubmit = () => {
    // Perform actions with the submitted rating (e.g., send it to a backend server)
    // Perform the API call to submit the rating
    axios
      .put(`${API_URL}/addRatings?id=${id}&iduser=${userId}`, {
        rating: rating,
      })
      .then((response) => {
        // Handle success
        console.log(response.data);
        setSubmitted(true);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  // Calculate the average rating using the utility function
  const averageRating = calculateAverageRating(user?.ratings);

  // Convert the average rating into stars
  const renderAverageRating = () => {
    const roundedRating = Math.round(averageRating);

    return "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
  };
  //////////////////////////////////

  ///////////////////////////////////////////////////////////
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
        `${API_URL}/updateprofessionals/${id}`,
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
    console.log("ok");
    try {
      // Send a request to your backend API to cancel the project
      const response = await axios.post(
        `${API_URL}/canceleProject?projectId=${projectId}`
      );
      // Assuming the backend responds with the updated project data
      // You can update the user's requestedProjects state or perform any other necessary updates
      console.log("Project canceled:", response.data);
    } catch (error) {
      console.error("Error canceling project:", error);
    }
  };

  const handleCancelManagedProject = async (projectId) => {
    try {
      // Send a request to your backend API to cancel the managed project
      const response = await axios.post(
        `${API_URL}/rejectProject?projectId=${projectId}`
      );
      // Assuming the backend responds with the updated project data
      // You can update the managedProjects state or perform any other necessary updates
      console.log("Managed project canceled:", response.data);
    } catch (error) {
      console.error("Error canceling managed project:", error);
    }
  };

  const handleAcceptManagedProject = async (projectId) => {
    try {
      // Send a request to your backend API to accept the managed project
      const response = await axios.post(
        `${API_URL}/accepteProject?projectId=${projectId}`
      );
      // Assuming the backend responds with the updated project data
      // You can update the managedProjects state or perform any other necessary updates
      console.log("Managed project accepted:", response.data);
    } catch (error) {
      console.error("Error accepting managed project:", error);
    }
  };

  ///////////////////////
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
    } else if (activeTab === "managed-projects") {
      return (
        <div>
          <h4>Managed Projects:</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {managedProjects.map((project) => (
                <tr key={project._id}>
                  <td>{project.subject}</td>
                  <td>{project.description}</td>
                  <td>
                    {project.status === "pending" ? (
                      <>
                        {isCurrentUserProfile ? (
                          <>
                            <Button
                              variant="outline-danger"
                              onClick={() =>
                                handleCancelManagedProject(project._id)
                              }
                            >
                              Refuser
                            </Button>
                            <Button
                              variant="outline-success"
                              onClick={() =>
                                handleAcceptManagedProject(project._id)
                              }
                            >
                              Accepter
                            </Button>
                          </>
                        ) : (
                          <p style={{ color: "blue" }}>{project.status}</p>
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Add additional form fields for other user properties */}
            <Button variant="outline-success" onClick={handleSaveClick}>
              Save
            </Button>
          </Form>
        </div>
      );
    } else {
      return (
        <div>
          <h2>User Profile</h2>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Display other user properties as needed */}
          {isCurrentUserProfile && (
            <>
              <Button variant="outline-primary" onClick={handleEditClick}>
                Edit
              </Button>
            </>
          )}
        </div>
      );
    }
  };

  return (
    <footer>
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
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src={`${API_URL}/${user.picture}`}
                          alt={user.username}
                          className="rounded-circle"
                          width="220"
                        />

                        <div className="mt-4">
                          <h4>{user.username}</h4>
                          <p className="text-secondary mb-1">{user.role}</p>
                          <p className="text-muted font-size-sm">
                            {user.location}
                          </p>
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => navigate("/Smodal")}
                          >
                            Avis
                          </button>

                          {isCurrentUserProfile ? (
                            <button
                              className="btn btn-outline-primary"
                              onClick={() =>
                                navigate("/Discussionprofessional")
                              }
                            >
                              Messagerie
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => setShowModal(true)}
                            >
                              Demander
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-2">
                    {/* Display the average rating as stars */}
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        Average Rating: {renderAverageRating()}
                      </h6>{" "}
                      {/* Display other professional profile information */}
                      {/* ... */}
                    </li>
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
                  <div className="card mb-3">
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
                        <Nav.Item>
                          <Nav.Link
                            eventKey="managed-projects"
                            onClick={() => handleTabChange("managed-projects")}
                          >
                            Managed Projects
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
        <MyModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedProfessional={user}
        />
      </div>
      <div className="container">
        <h1 className="mt-5">Évaluation par étoiles</h1>
        <StarRating rating={rating} onRatingChange={handleRatingChange} />
        {!submitted ? (
          <button
            className="btn btn-outline-primary mt-3"
            onClick={handleSubmit}
          >
            Valider
          </button>
        ) : (
          <p>Votre évaluation a été soumise avec succès !</p>
        )}
        <p>Vous avez attribué {rating} étoile(s).</p>
      </div>
    </footer>
  );
};

export default ProfilProfessional;
