import React from "react";
import "./search.css";

import { useSearchParams } from "react-router-dom";

import BlogsContainer from "../../components/BlogsContainer";
import NoResult from "./noResult";

const Search = () => {
  const search = useSearchParams();
  const searchValue = search[0].get("value");

  return (
    <div className="search">
      <h2>Search: {searchValue} </h2>
      {/* <NoResult /> */}
      <BlogsContainer />
    </div>
  );
};

export default Search;
