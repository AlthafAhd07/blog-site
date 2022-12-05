import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./search.css";

import { showErrMsg } from "../../features/alertSlice";

import NoResult from "./noResult";
import BlogsContainer from "../../components/BlogsContainer";
import SearchLoader from "./searchLoader";

const Search = () => {
  const search = useSearchParams();
  const searchValue = search[0].get("value");

  const [blogs, setBlogs] = useState([]);
  const [searching, setSearching] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutFun = setTimeout(async () => {
      try {
        setSearching(true);
        const res = await axios.get(`/api/search?value=${searchValue}`);
        setBlogs(res.data.msg);
        setSearching(false);
      } catch (error) {
        dispatch(showErrMsg(error.response.data.msg));
      }
    }, 350);
    return () => clearTimeout(timeoutFun);
  }, [searchValue]);

  return (
    <div className="search">
      <h2>Search : {searchValue} </h2>
      {searching && <SearchLoader />}
      {blogs.length < 1 ? (
        !searching && <NoResult />
      ) : (
        <BlogsContainer Blogs={blogs} />
      )}
    </div>
  );
};

export default Search;
