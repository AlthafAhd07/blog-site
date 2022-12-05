import React from "react";

import "./searchLoader.css";

const SearchLoader = () => {
  return (
    <div className="search__loader">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SearchLoader;
