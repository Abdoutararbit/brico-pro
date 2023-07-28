import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          style={{
            fontSize: "28px",
            color: star <= rating ? "yellow" : "#ccc",
            cursor: "pointer",
          }}
          onClick={() => handleRatingChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
