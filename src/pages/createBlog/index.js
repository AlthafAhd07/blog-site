import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./createBlog.css";

import Blog from "../blog/main/Blog";

import { selectAuth } from "../../features/authSlice";
import {
  changeLoadingState,
  showErrMsg,
  showSuccessMsg,
} from "../../features/alertSlice";
import { addNewBlog } from "../../features/blogSlice";

import { createBlogApi } from "../../api/blogApi";

const initalaBlogState = {
  title: "",
  description: "",
  thumbnail: "",
  category: "Front-end",
};

const CreateBlog = () => {
  const [blog, setBlog] = useState(initalaBlogState);
  const [tempImg, setTempImg] = useState("");

  const { user } = useSelector(selectAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function HandleBlogInput({ target }) {
    setBlog((old) => ({ ...old, [target.name]: target.value }));
  }

  async function createBlog(event) {
    event.preventDefault();

    if (!isValidBlog(blog, dispatch)) return;
    if (!isValidImage(tempImg, dispatch)) return;

    try {
      dispatch(changeLoadingState(true));

      const imageUrl = await uploadImg(tempImg);

      if (!imageUrl) {
        dispatch(changeLoadingState(false));
        dispatch(showErrMsg("An error occured in image upload..."));
        return;
      }

      const res = createBlogApi({
        ...blog,
        thumbnail: imageUrl,
      });

      dispatch(showSuccessMsg("Blog created Successfully!"));
      dispatch(changeLoadingState(false));

      dispatch(addNewBlog(res.data.newBlog));
      navigate("/");
    } catch (error) {
      dispatch(changeLoadingState(false));
      dispatch(showErrMsg(error.response?.data?.msg));
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="createBlog">
      <div className="create">
        <h2>Create Blog</h2>
        <form className="createBlog__form" onSubmit={createBlog}>
          <label htmlFor="blogTitile">Title :</label>
          <input
            name="title"
            type="text"
            id="blogTitile"
            onInput={HandleBlogInput}
          />
          <label htmlFor="">
            Upload Image :{" "}
            <input type="file" onInput={(e) => setTempImg(e.target.files[0])} />
          </label>

          <label htmlFor="blogContent">Content :</label>
          <textarea
            name="description"
            id="blogContent"
            onInput={HandleBlogInput}
          ></textarea>
          <label>
            Category :
            <select name="category" onChange={HandleBlogInput}>
              <option name="Front-end">Front-end</option>
              <option name="Backend">Backend</option>
              <option name=" UI">UI</option>
              <option name="Network">Network</option>
            </select>
          </label>
          <button>Create Blog</button>
        </form>
      </div>
      <div className="preview">
        <h2>Preview</h2>
        <Blog
          blog={{
            ...blog,
            author: {
              username: user.username,
              avatar: user.avatar,
              profession: user.profession,
            },
            thumbnail: tempImg ? URL.createObjectURL(tempImg) : "",
            createdAt: Date.now(),
          }}
        />
      </div>
    </div>
  );
};

export default CreateBlog;

function isValidBlog({ title, description, category }, dispatch) {
  if (!(!!title && !!description && !!category)) {
    dispatch(showErrMsg("Please fill all fields."));
    return false;
  }
  if (title.length < 6) {
    dispatch(showErrMsg("Title should contain atleast 6 chars"));

    return false;
  }
  if (description.length < 20) {
    dispatch(showErrMsg("blog should contain atleast 20 chars"));
    return false;
  }
  return true;
}

function isValidImage(tempImg, dispatch) {
  if (!tempImg) {
    dispatch(showErrMsg("Please add an Image"));
    return false;
  }

  if (!tempImg?.name?.match(/\.(jpg|jpeg|png)$/)) {
    dispatch(showErrMsg("Invalid image format.."));
    return false;
  }
  return true;
}

export function uploadImg(tempImg) {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append("file", tempImg);
    data.append("upload_preset", "eui92kle");
    data.append("cloud_name", "davg6e0yh");

    fetch("https://api.cloudinary.com/v1_1/davg6e0yh/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res.url);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
