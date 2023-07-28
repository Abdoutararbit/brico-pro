import React, { useState } from "react";
import StarRating from "../components/StarRating";
import axios from "axios";
import { API_URL } from "../utils/config";
import { calculateAverageRating } from "../utils/rating"; // Import the calculateAverageRating function

import { Modal } from "react-bootstrap";
const Smodal = ({ id, userId, user }) => {
  /////////////ratings//////////////
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setSubmitted(false); // Reset submitted status when the rating changes
  };

  const handleSubmit = () => {
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

  return (
    <Modal show={true} size="sm">
      <Modal.Header closeButton>
        <Modal.Title className="text-center">
          Évaluation par étoiles:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <div>
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

        {/* Render the average rating */}
        <p>Évaluation moyenne : {renderAverageRating()}</p>
      </div>
    </Modal>
  );
};

export default Smodal;
