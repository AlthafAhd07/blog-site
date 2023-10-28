import React from "react";

import "./noResult.css";

const NoResult = ({ searchValue }) => {
  return (
    <div className="noResult">
      <h3>No result 😥</h3>
      <p>
        We couldn’t find any posts with the keyword {searchValue}. Please try
        another keyword.
      </p>
    </div>
  );
};

export default NoResult;
