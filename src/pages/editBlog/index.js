import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  changeLoadingState,
  showErrMsg,
  showSuccessMsg,
} from "../../features/alertSlice";
import { selectAuth } from "../../features/authSlice";
import { selectBlogs, updateSingleBlog } from "../../features/blogSlice";

import Blog from "../blog/main/Blog";
import { uploadImg } from "../createBlog";

import "../createBlog/createBlog.css";
const initalaBlogState = {
  title: "",
  description: "",
  thumbnail: "",
  category: "Front-end",
};
const EditBlog = () => {
  const [blog, setBlog] = useState(initalaBlogState);
  const [tempImg, setTempImg] = useState();

  const { allBlogs, userBlogs } = useSelector(selectBlogs);
  const { user, access_token } = useSelector(selectAuth);

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const concated = allBlogs.concat(userBlogs);

    const checkInLocal = concated.find((blog) => blog._id === id);

    if (checkInLocal) {
      if (checkInLocal.author.userId !== user._id) {
        navigate("/");
        return;
      }
      setBlog(checkInLocal);
    }
    async function getSingleBlog() {
      try {
        const res = await axios.get(`/api/specificBlog/${id}`);
        if (res.data.author.userId !== user._id) {
          navigate("/");
          return;
        }
        setBlog(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSingleBlog();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!tempImg) return;
    setBlog((old) => ({ ...old, thumbnail: URL.createObjectURL(tempImg) }));
  }, [tempImg]);

  function HandleUpdateBlogInput({ target }) {
    setBlog((old) => ({ ...old, [target.name]: target.value }));
  }
  async function updateBlog(event) {
    event.preventDefault();
    dispatch(changeLoadingState(true));
    let imageUrl;
    if (tempImg) {
      imageUrl = await uploadImg(tempImg);
    }
    try {
      await axios.put(
        "/api/blog/update",
        {
          id,
          ...blog,
          thumbnail: imageUrl ? imageUrl : blog.thumbnail,
        },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );

      dispatch(
        updateSingleBlog({
          id,
          ...blog,
          thumbnail: imageUrl ? imageUrl : blog.thumbnail,
        })
      );
      dispatch(showSuccessMsg("blog Updated!"));
      navigate("/");
      dispatch(changeLoadingState(false));
    } catch (error) {
      dispatch(changeLoadingState(false));
      dispatch(showErrMsg(error.response.data.msg));
    }
  }
  return (
    <div className="createBlog">
      <div className="create">
        <h2>Update Blog</h2>
        <form className="createBlog__form" onSubmit={updateBlog}>
          <label htmlFor="blogTitile">Title :</label>
          <input
            name="title"
            type="text"
            id="blogTitile"
            value={blog.title}
            onInput={HandleUpdateBlogInput}
          />
          <label htmlFor="">
            Upload Image :{" "}
            <input type="file" onInput={(e) => setTempImg(e.target.files[0])} />
          </label>

          <label htmlFor="blogContent">Content :</label>
          <textarea
            name="description"
            id="blogContent"
            value={blog.description}
            onInput={HandleUpdateBlogInput}
          ></textarea>
          <label>
            Category :
            <select
              name="category"
              value={blog.category}
              onChange={HandleUpdateBlogInput}
            >
              <option name="Front-end">Front-end</option>
              <option name="Backend">Backend</option>
              <option name=" UI">UI</option>
              <option name="Network">Network</option>
            </select>
          </label>
          <button>Update Blog</button>
        </form>
      </div>
      <div className="preview">
        <h2>Preview</h2>
        <Blog blog={blog} />
      </div>
    </div>
  );
};

export default EditBlog;
