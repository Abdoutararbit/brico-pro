import React, { useState } from "react";
import StarRating from "../components/StarRating";
import axios from "axios";
import { API_URL } from "../utils/config";
import { calculateAverageRating } from "../utils/rating"; // Import the calculateAverageRating function

import { Modal } from "react-bootstrap";
const Smodal = ({ id, userId, user, close }) => {
  /////////////ratings//////////////
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setSubmitted(false); // Reset submitted status when the rating changes
  };

  const handleSubmit = () => {
    if (rating === 0) {
      // If no star is selected, do not proceed with submission
      return;
    }
    // Perform the API call to submit the rating
    console.log(id, userId);
    axios
      .put(`${API_URL}/addRatings?id=${id}&iduser=${userId}`, {
        rating: rating,
      })
      .then((response) => {
        // Handle success
        console.log(response.data);
        setSubmitted(true);
        // Close the modal after a successful submission
        setTimeout(() => {
          close(); // Call the close function to close the modal
        }, 2000); // Close the modal after 2 seconds (adjust as needed)
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        alert("veuillez vous authentifier");
      });
  };

  // Calculate the average rating using the utility function
  const averageRating = calculateAverageRating(user?.ratings);

  // Convert the average rating into stars
  const renderAverageRating = () => {
    const roundedRating = Math.round(averageRating);

    return "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
  };

  return (
    <Modal show={true} size="md" onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">
          Évaluation par étoiles:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
          {!submitted ? (
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
              onClick={handleSubmit}
            >
              Valider
            </button>
          ) : (
            <p>Votre évaluation a été soumise avec succès !</p>
          )}
          <p>Vous avez attribué {rating} étoile(s).</p>

          {/* Render the average rating */}
          <p>Évaluation moyenne : {renderAverageRating()}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Smodal;
