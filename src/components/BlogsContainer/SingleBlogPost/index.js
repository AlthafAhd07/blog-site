import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./singleBlogPost.css";

import { selectAuth } from "../../../features/authSlice";
import {
  changeLoadingState,
  showErrMsg,
  showSuccessMsg,
} from "../../../features/alertSlice";
import { deleteSinglePost } from "../../../features/blogSlice";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Delete } from "../../../assets/images/delete-icon.svg";

import CategoryAndDate from "../../CategoryAndDate";
import AuthorData from "../../authorData";

import { CheckTokenEx } from "../../../utils/checkTokenExpiration";

const SingleBlogPost = ({ data }) => {
  const { user, access_token } = useSelector(selectAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleFunctionDlt() {
    try {
      dispatch(changeLoadingState(true));

      const token = await CheckTokenEx(access_token, dispatch);

      await axios.post(
        "/api/blog/delete",
        { blogid: data._id },
        {
          headers: { Authorization: token },
        }
      );

      dispatch(deleteSinglePost(data._id));
      dispatch(changeLoadingState(false));
      dispatch(showSuccessMsg("blog deleted!"));
    } catch (error) {
      dispatch(showErrMsg(error.response.data.msg));
    }
  }

  return (
    <div className="singleBlogPost">
      {data && data?.author?.userId === user?._id && (
        <div className="edit_controls">
          <Edit onClick={() => navigate(`/edit/${data._id}`)} />
          <Delete onClick={handleFunctionDlt} />
        </div>
      )}

      {data?.thumbnail && (
        <img className="skeleton" src={data?.thumbnail} alt="" />
      )}

      <div className="postData">
        <CategoryAndDate category={data?.category} date={data?.createdAt} />
        <h2 onClick={() => navigate(`/blog/${data._id}`)}>{data?.title}</h2>
        <p>{data?.description}</p>
        <AuthorData author={data?.author} />
      </div>
    </div>
  );
};

export default SingleBlogPost;
