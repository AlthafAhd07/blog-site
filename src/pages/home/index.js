import React from "react";
import Hero from "./components/hero";
import BlogsContainer from "../../components/BlogsContainer";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <BlogsContainer />
    </div>
  );
};

export default Home;
