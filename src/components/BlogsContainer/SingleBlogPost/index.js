import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./singleBlogPost.css";

import CategoryAndDate from "../../CategoryAndDate";
import AuthorData from "../../authorData";

import { selectAuth } from "../../../features/authSlice";
import { showToast } from "../../../features/alertSlice";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Delete } from "../../../assets/images/delete-icon.svg";
import { deleteSinglePost } from "../../../features/blogSlice";

const SingleBlogPost = ({ data }) => {
  const { user, access_token } = useSelector(selectAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleFunctionDlt() {
    try {
      await axios.post(
        "/api/blog/delete",
        { blogid: data._id },
        {
          headers: { Authorization: access_token },
        }
      );
      dispatch(
        showToast({ visible: true, type: "success", msg: "blog deleted!" })
      );
      dispatch(deleteSinglePost(data._id));
    } catch (error) {
      dispatch(
        showToast({
          visible: true,
          type: "err",
          msg: error.response.data.msg,
        })
      );
    }
  }

  return (
    <div className="singleBlogPost">
      {data?.author?.userId === user?._id && (
        <div className="edit_controls">
          <Edit onClick={() => navigate(`/edit/${data._id}`)} />
          <Delete onClick={handleFunctionDlt} />
        </div>
      )}
      <img className="skeleton" src={data?.thumbnail} alt="" />
      <div className="postData">
        <CategoryAndDate category={data?.category} date={data?.updatedAt} />
        <h2 onClick={() => navigate(`/blog/${data._id}`)}>{data?.title}</h2>
        <p>{data?.description}</p>
        <AuthorData author={data?.author} />
      </div>
    </div>
  );
};

export default SingleBlogPost;
