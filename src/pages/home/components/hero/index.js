import React from "react";

import "./hero.css";

import HeroImg from "../../../../assets/images/heroImg.png";

import Author from "../hero/author-3.png";

const Hero = () => {
  return (
    <div className="hero">
      <img src={HeroImg} alt="" className="hero__img" />
      <div className="hero__postData">
        <section>
          9 TO 5 <div></div> June 22, 2021
        </section>
        <h2>
          Understanding color theory: the color wheel and finding complementary
          colors
        </h2>
        <p>
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </p>
        <div className="hero__authorData">
          <img src={Author} alt="" />
          <span>Jenny Wilson</span>
          <span>Product Designer</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
