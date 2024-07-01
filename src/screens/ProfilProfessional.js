import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/config";
import StarRating from "../components/StarRating";
import Chart from "../components/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import mapIconImage from "../assets/images/pngegg.png";
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
import Smodal from "../components/Smodal";
/////////////////////////////////////////////
const ProfilProfessional = () => {
  const { id } = useParams();
  const userId = sessionStorage.getItem("userId");
  const email = sessionStorage.getItem("email");
  const isCurrentUserProfile = id === userId;
  console.log(isCurrentUserProfile);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  // Définissez la fonction setPosition
  const setPosition = (lat, long) => {
    // Faites quelque chose avec lat et long, par exemple, les stocker dans l'état
    setLatitude(36.5890591269992);
    setLongitude(3.765712338639898);
  };
  const [editingPhoto, setEditingPhoto] = useState(false);

  const [updatedUser, setUpdatedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("managed-projects");
  const [managedProjects, setManagedProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalAvis, setShowModalAvis] = useState(false);
  const [latitude, setLatitude] = useState(0); // Déclarez la latitude
  const [longitude, setLongitude] = useState(0); // Déclarez la longitude
  const [selectedImage, setSelectedImage] = useState(null);

  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const unitRef = useRef(null);
  const navigate = useNavigate();
  // État local pour stocker les valeurs mises à jour du prix
  const [updatedAmount, setUpdatedAmount] = useState(null);
  const [updatedUnit, setUpdatedUnit] = useState(null);
  //////////////////////////
  const handleUpdateprice = async () => {
    console.log("handleUpdateprice called"); // Ajoutez cette ligne

    try {
      const response = await axios.post(`${API_URL}/updateprice?userId=${id}`, {
        amount,
        unit: unit !== "" ? unit : unitRef.current.value,
      });

      console.log(response.data); // Vous pouvez faire quelque chose avec la réponse ici
      // Actualisez la page
      console.log("Mise à jour réussie. Rafraîchissement de la page...");
      window.location.reload(true);
      // Mettez à jour l'état local avec les nouvelles valeurs si la mise à jour réussit
      if (
        response.data &&
        response.data.updatedAmount &&
        response.data.updatedUnit
      ) {
        setUpdatedAmount(response.data.updatedAmount);
        setUpdatedUnit(response.data.updatedUnit);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const statusTranslations = {
    accepted: "Accepté",
    canceled: "Annulé",
    rejected: "Refusé",
    pending: "En attente",
  };

  useEffect(() => {
    console.log("connected id", userId);
    console.log("profil du prestataire", id);
    // Condition to check if the id of the profile user matches the id of the connected user

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/profilusers/${id}`);
        console.log(response);
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
        window.location.reload();
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
    // Actualiser la page pour refléter les changements
    window.location.reload();
    try {
      const response = await axios.put(
        `${API_URL}/updateprofessionals/${id}`,
        updatedUser
      );

      // Assuming response.data contains the updated user data
      setUser(response.data); // Update the user state with the updated data
      setEditing(false); // Exit edit mode
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleCancelProject = async (projectId) => {
    console.log("ok");
    // Actualiser la page pour refléter les changements
    window.location.reload();
    try {
      // Send a request to your backend API to cancel the project
      const response = await axios.post(
        `${API_URL}/canceleProject?projectId=${projectId}`
      );
      // Assuming the backend responds with the updated project data
      // You can update the user's requestedProjects state or perform any other necessary updates
      console.log("Project canceled:", response.data);
      console.log("Project canceled:", response.data);

      // Actualiser la page pour refléter les changements
      window.location.reload();
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
      // Actualiser la page pour refléter les changements
      window.location.reload();
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
      // Actualiser la page pour refléter les changements
      window.location.reload();
    } catch (error) {
      console.error("Error accepting managed project:", error);
    }
  };
  //////////////////////////////////
  ///////////////////////
  const renderTabContent = () => {
    if (activeTab === "projects") {
      return (
        <div>
          <h2>Projets Demander:</h2>
          <hr></hr>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sujet</th>
                <th>Description</th>
                <th>Date de début</th>
                <th>Date de fin</th>
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
                              boxShadow: "2px 2px 4px rgba(255, 255, 0, 0.1)", // Ajoute une ombre douce pour un effet 3D subtil
                              borderRadius: "8px",
                              transition: "background-color 0.3s ease",
                            }}
                            onClick={() => handleCancelProject(project._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            <span className="ms-1">Annuler projet</span>
                          </Button>
                        ) : (
                          <p style={{ color: "blue" }}>
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
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    } else if (activeTab === "managed-projects") {
      return (
        <div>
          <h2>les Demandes des clients:</h2>
          <hr></hr>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Description</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Position</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {managedProjects.map((project) => (
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

                  <td style={{ width: "5%" }}>
                    {isCurrentUserProfile ? (
                      <a
                        target="_blank"
                        href={`https://www.google.com/maps?q=${project.latitude},${project.longitude}`}
                      >
                        <img
                          src={mapIconImage} // Utilisez la variable mapIconImage comme chemin d'accès à l'image
                          alt="Icône de carte"
                          style={{
                            width: "50%", // Ajuster la taille de l'image
                            height: "50%", // Ajuster la taille de l'image
                          }}
                        />
                      </a>
                    ) : (
                      <img
                        src={mapIconImage}
                        alt="Icône de carte"
                        style={{
                          width: "50%",
                          height: "50%",
                        }}
                      />
                    )}
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {project.status === "pending" ? (
                        <>
                          {isCurrentUserProfile ? (
                            <>
                              <Button
                                className="btn btn-danger btn-sm d-flex align-items-center"
                                style={{
                                  padding: "10px 20px",
                                  border: "3px solid white",
                                  boxShadow: "2px 2px 4px rgba(8, 0, 0, 0.1)", // Ajoute une ombre douce pour un effet 3D subtil
                                  borderRadius: "8px",
                                  transition: "background-color 0.3s ease",
                                }}
                                onClick={() =>
                                  handleCancelManagedProject(project._id)
                                }
                              >
                                <FontAwesomeIcon icon={faTimes} />
                                Refuser
                              </Button>
                              <Button
                                className="btn btn-success btn-sm d-flex align-items-center"
                                style={{
                                  padding: "10px 20px",
                                  border: "3px solid white",
                                  boxShadow: "2px 2px 4px rgba(8, 0, 0, 0.1)", // Ajoute une ombre douce pour un effet 3D subtil
                                  borderRadius: "8px",
                                  transition: "background-color 0.3s ease",
                                }}
                                onClick={() =>
                                  handleAcceptManagedProject(project._id)
                                }
                              >
                                <FontAwesomeIcon icon={faCheck} /> Accepter
                              </Button>
                            </>
                          ) : (
                            <p style={{ color: "blue" }}>
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    } else if (activeTab === "Tarif") {
      return (
        <div>
          <h2>Modifier le tarif :</h2>
          <hr></hr>
          <div className=" btn mt-1 d-flex flex-row align-items-center">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Montant"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              className="form-control mb-3"
              value={unit}
              ref={unitRef}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="heure">Par heure</option>
              <option value="jour">Par jour</option>
              <option value="semaine">Par semaine</option>
              <option value="mois">Par mois</option>
            </select>
          </div>

          <button
            className="btn mt-0"
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
            onClick={handleUpdateprice}
          >
            Mettre à jour le prix
          </button>
        </div>
      );
    } else if (activeTab === "profile-edit") {
      return (
        <div>
          <h2>Modifier les informations personnelles</h2>
          <hr></hr>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nom/prenome</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
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
        </div>
      );
    }
  };

  return (
    <footer>
      {showModalAvis && (
        <Smodal id={id} userId={userId} close={() => setShowModalAvis(false)} />
      )}
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
                          width="220vw"
                          height="180vh"
                          style={{
                            cursor: "pointer",
                            border: "1px solid black",
                          }} // Optional: Show a pointer cursor when hovering over the image
                          onMouseEnter={() => setEditingPhoto(true)}
                          onMouseLeave={() => setEditingPhoto(false)}
                        />
                        {editingPhoto && (
                          <div className="edit-photo-overlay">
                            <label
                              htmlFor="fileInput"
                              className="custom-upload-button"
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                style={{
                                  fontSize: "1.5rem",
                                  cursor: "pointer",
                                }}
                              />
                              Modifier la photo
                            </label>
                            <input
                              type="file"
                              id="fileInput"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={(e) =>
                                handleFileChange(e.target.files[0])
                              }
                            />
                          </div>
                        )}
                        <div className="mt-4">
                          <h4>{user.username}</h4>
                          <p className="text-secondary mb-1">{user.role}</p>
                          <p className="text-muted font-size-sm">
                            {user.location}
                          </p>
                          {isCurrentUserProfile ? (
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
                                onClick={() =>
                                  navigate("/Discussionprofessional")
                                }
                              >
                                <FontAwesomeIcon icon={faEnvelope} /> Messagerie
                              </button>
                            </>
                          ) : (
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
                                onClick={() => setShowModal(true)}
                              >
                                Demander
                              </button>
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
                                onClick={() => {
                                  setShowModalAvis(true);
                                  //navigate("/Smodal")
                                }}
                              >
                                noter
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-2">
                    {/* Display the average rating as stars */}
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h2>Note moyenne: {renderAverageRating()}</h2>

                      {/* Display other professional profile information */}
                      {/* ... */}
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h2>Prix: </h2>
                      {updatedAmount && updatedUnit ? (
                        <>
                          <span className="font-weight-bold">
                            {updatedAmount}
                          </span>
                          Da / <span>{updatedUnit}</span>
                        </>
                      ) : (
                        <>
                          <span className="font-weight-bold">
                            {user?.price?.amount}
                          </span>
                          Da / <span>{user?.price?.unit}</span>
                        </>
                      )}
                    </li>
                  </div>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h2 className="mb-0">Projets gérés :</h2>
                    <Chart professional={user} />
                  </li>
                </Col>
                <Col md="8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <Nav variant="tabs" defaultActiveKey="projects">
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
                            eventKey="managed-projects"
                            onClick={() => handleTabChange("managed-projects")}
                            style={{
                              backgroundColor:
                                activeTab === "managed-projects"
                                  ? "black"
                                  : "inherit",
                              color:
                                activeTab === "managed-projects"
                                  ? "white"
                                  : "inherit",
                            }}
                          >
                            Projets gérés
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="Tarif"
                            onClick={() => handleTabChange("Tarif")}
                            style={{
                              backgroundColor:
                                activeTab === "Tarif" ? "black" : "inherit",
                              color:
                                activeTab === "Tarif" ? "white" : "inherit",
                            }}
                          >
                            Tarif
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
    </footer>
  );
};

export default ProfilProfessional;
