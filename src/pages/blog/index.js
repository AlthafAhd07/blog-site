import React from "react";

import "./blog.css";

import CategoryAndDate from "../../components/CategoryAndDate";
import AuthorData from "../../components/authorData";

import Thumbnail from "./BlogMain.png";

const Blog = () => {
  return (
    <div className="blog">
      <CategoryAndDate />
      <h1>
        Understanding color theory: the color wheel and finding complementary
        colors
      </h1>
      <AuthorData />
      <img src={Thumbnail} alt="" />
      <pre>{abc}</pre>
    </div>
  );
};

export default Blog;

const abc = `Male sixth sea it a. Brought was signs female darkness signs form cattle land grass whose from subdue also they're their brought seas isn't, to day from bearing grass third midst after beginning man which you're. Dry, gathering beginning given made them evening.

Lights dry. Thing, likeness, forth shall replenish upon abundantly our green. Seed green sea that lesser divided creature beginning land him signs stars give firmament gathered. Wherein there their morning a he grass. Don't made moving for them bring creature us you'll tree second deep good unto good may. Us yielding.

Have. Man upon set multiply moved from under seasons abundantly earth brought a. They're open moved years saw isn't morning darkness. Over, waters, every let wherein great were fifth saw was lights very our place won't and him Third fourth moving him whales behold. Beast second stars lights great was don't green give subdue his. Third given made created, they're forth god replenish have whales first can't light was. Herb you'll them beast kind divided. Were beginning fly air multiply god Yielding sea don't were forth.`;