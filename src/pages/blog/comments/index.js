import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./comments.css";

import SingelComment from "./SingelComment";

import { selectAuth } from "../../../features/authSlice";
import { showErrMsg } from "../../../features/alertSlice";

import { createCommentApi } from "../../../api/commentApi";

const Comments = ({ comments, blogId, setBlog }) => {
  const [newcomment, setNewComment] = useState("");

  const { access_token, user } = useSelector(selectAuth);
  const dispatch = useDispatch();

  async function handleCreateComment(event) {
    event.preventDefault();

    if (!access_token) {
      dispatch(showErrMsg("Please login to add comments."));
      return;
    }

    if (newcomment.length < 1) return;

    try {
      // here I am using this to just show the comment to the user instantly. These datas are not send to the backend only the comment will be sent to the backend
      const newCmt = {
        comment: newcomment,
        commentOwner: {
          id: user._id,
          username: user.username,
          profession: user.profession,
          avatar: user.avatar,
        },
        id: Math.round(Math.random() * 100000),
        createdAt: Date.now(),
      };
      setBlog((old) => ({
        ...old,
        comments: [newCmt, ...old.comments],
      }));
      setNewComment("");

      await createCommentApi({ blogId, comment: newcomment });
    } catch (error) {
      dispatch(showErrMsg(error.response.data.msg));
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
