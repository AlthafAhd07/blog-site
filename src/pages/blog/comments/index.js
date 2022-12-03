import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../features/authSlice";
import "./comments.css";
import SingelComment from "./SingelComment";

const Comments = ({ comments, blogId, setBlog }) => {
  const [newcomment, setNewComment] = useState("");

  const { access_token } = useSelector(selectAuth);

  async function handleCreateComment(event) {
    event.preventDefault();
    if (newcomment.length < 1) return;
    try {
      const res = await axios.post(
        "/api/blog/comment",
        { blogId, comment: newcomment },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      setBlog((old) => ({
        ...old,
        comments: [res.data.createdComment, ...old.comments],
      }));
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="comments">
      <h3>
        Comments <span>{comments?.length}</span>
      </h3>
      <form className="createComment" onSubmit={handleCreateComment}>
        <input
          type="text"
          placeholder="Add comment..."
          value={newcomment}
          onInput={(e) => setNewComment(e.target.value)}
        />
        <button>Send</button>
      </form>
      <section className="commentWrapper">
        {comments?.map((comment) => {
          return <SingelComment comment={comment} key={comment.id} />;
        })}
      </section>
    </div>
  );
};

export default Comments;
