import React, { useState } from "react";
import axios from "axios"; // Import Axios to make API requests

const SearchEngine = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      console.log("searchInput:", searchInput);
      const response = await axios.get(
        `http://127.0.0.1:3000/api/search?search=${searchInput}` // Ajoutez "/api" avant "searchengine"
      );
      console.log("response.data:", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error while fetching users:", error);

      // Handle error if needed
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "18vh" }} // Use minHeight instead of height for proper centering
    >
      <div className="text">
        {/* Use text-center class to center the content */}
        <h4>Search Profession</h4>
        <div className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="SearchProfession"
            aria-label="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {/* Display search results */}
        <div>
          {searchResults.map((result) => (
            <div key={result._id}>
              <h3>{result.username}</h3>
              {result.profession && <p>Profession: {result.profession.name}</p>}
              {/* Display other user details as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchEngine;
