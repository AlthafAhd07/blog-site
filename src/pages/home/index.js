import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { selectBlogs, setAllBlogs } from "../../features/blogSlice";

import Hero from "./components/hero";
import BlogsContainer from "../../components/BlogsContainer";
import { showErrMsg } from "../../features/alertSlice";

const Home = () => {
  const { allBlogs } = useSelector(selectBlogs);

  useSetAllBlogs(allBlogs);

  return (
    <div className="home">
      <Hero />
      <BlogsContainer Blogs={allBlogs} />
    </div>
  );
};

export default Home;

function useSetAllBlogs(allBlogs) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAllBlogs() {
      try {
        const res = await axios.get("/api/blog/all");
        dispatch(setAllBlogs(res.data));

        if (!!!allBlogs) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (error) {
        dispatch(showErrMsg(error.response.data.msg));
      }
    }
    getAllBlogs();
  }, [dispatch]);
}
