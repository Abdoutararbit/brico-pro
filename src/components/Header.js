import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/config";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const userId = sessionStorage.getItem("userId");
  const role = sessionStorage.getItem("role");
  console.log(role);
  const [userData, setUserData] = useState(null); // State to hold user data
  const navigate = useNavigate();
  const isLoggedIn = !!userId; // Check if the user is logged in
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session data on logout
    window.location.reload(); // Refresh the page after logout to update the header
  };

  useEffect(() => {
    // Fetch user data when the component mounts if the user is logged in
    if (isLoggedIn) {
      // Implement your API endpoint to fetch user data by userId
      axios
        .get(`${API_URL}/profilusers/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          // Handle error, e.g., show an error message or redirect to sign-in page
        });
    }
  }, [isLoggedIn, userId]);
  const handleAvatarClick = () => {
    if (role === "professional") {
      navigate(`/ProfilProfessional/${userId}`);
    } else if (role === "user") {
      navigate(`/ProfilUser/${userId}`);
    } else if (role === "admin") {
      navigate(`/ProfilAdmin/${userId}`);
    } else {
      console.error("Invalid role");
    }
  };

  return (
    <header className="bg-primary text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo">
          <h3>Your Logo</h3>
        </div>
        <div className="links d-flex align-items-center">
          {isLoggedIn ? (
            <>
              <Link to="/Professions" className="text-white me-2">
                <h5>Home</h5>
              </Link>
              {userData && (
                <div className="d-flex align-items-center user-avatar ms-2">
                  <img
                    src={`${API_URL}/${userData.picture}`}
                    alt="User Avatar"
                    className="rounded-circle"
                    width="50"
                    onClick={handleAvatarClick}
                    style={{ cursor: "pointer" }} // Optional: Show a pointer cursor when hovering over the image
                  />

                  <div className="dropdown ms-2">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Connecter
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          style={{ backgroundColor: "red", color: "white" }}
                          className="logout-button"
                          onClick={handleLogout}
                        >
                          Déconnecter
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/Signup" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/" className="btn btn-secondary">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
