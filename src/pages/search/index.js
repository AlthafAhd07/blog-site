import axios from "axios";
import React, { useEffect, useState } from "react";

import "./search.css";

import { useSearchParams } from "react-router-dom";
import BlogsContainer from "../../components/BlogsContainer";
import NoResult from "./noResult";

const Search = () => {
  const search = useSearchParams();
  const searchValue = search[0].get("value");

  const [blogs, setBlogs] = useState([]);
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    const timeoutFun = setTimeout(async () => {
      setSearching(true);
      const res = await axios.get(`/api/search/${searchValue}`);
      setBlogs(res.data.msg);
      setSearching(false);
    }, 500);
    return () => clearTimeout(timeoutFun);
  }, [searchValue]);

  return (
    <div className="search">
      <h2>Search: {searchValue} </h2>

      {blogs.length < 1 ? (
        !searching && <NoResult />
      ) : (
        <BlogsContainer Blogs={blogs} />
      )}
    </div>
  );
};

export default Search;
