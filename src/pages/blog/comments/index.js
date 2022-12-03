import React from "react";
import "./comments.css";
import SingelComment from "./SingelComment";

const Comments = () => {
  return (
    <div className="comments">
      <h3>
        Comments <span>12</span>
      </h3>
      <form className="createComment">
        <input type="text" placeholder="Add comment..." />
        <button>Send</button>
      </form>
      <section className="commentWrapper">
        <SingelComment />
        <SingelComment />
        <SingelComment />
        <SingelComment />
        <SingelComment />
        <SingelComment />
        <SingelComment />
      </section>
    </div>
  );
};

export default Comments;
