import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./createBlog.css";

import Blog from "../blog/main/Blog";
import { selectAuth } from "../../features/authSlice";
import { changeLoadingState, showToast } from "../../features/alertSlice";
import { addNewBlog } from "../../features/blogSlice";

const initalaBlogState = {
  title: "",
  description: "",
  thumbnail: "",
  category: "Front-end",
};

const CreateBlog = () => {
  const [blog, setBlog] = useState(initalaBlogState);
  const [tempImg, setTempImg] = useState("");

  const { user, access_token } = useSelector(selectAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function HandleBlogInput({ target }) {
    setBlog((old) => ({ ...old, [target.name]: target.value }));
  }

  async function createBlog(event) {
    event.preventDefault();
    if (!isValidBlog(blog)) return;
    if (!tempImg) return;
    if (!tempImg?.name?.match(/\.(jpg|jpeg|png)$/)) {
      console.log("invalid image format");
      return;
    }
    dispatch(changeLoadingState());

    const imageUrl = await uploadImg(tempImg);
    if (!imageUrl) {
      dispatch(changeLoadingState());
      return;
    }

    try {
      const res = await axios.post(
        "/api/blog/create",
        {
          ...blog,
          thumbnail: imageUrl,
        },
        {
          headers: { Authorization: access_token },
        }
      );

      dispatch(
        showToast({
          visible: true,
          type: "success",
          msg: "Blog created Successfully!",
        })
      );
      dispatch(changeLoadingState(false));
      dispatch(addNewBlog(res.data.newBlog));
      navigate("/");
    } catch (error) {
      dispatch(changeLoadingState(false));
      dispatch(
        showToast({ visible: true, type: "err", msg: error.responce.data.msg })
      );
      console.log(error);
    }
  }

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
            updatedAt: Date.now(),
          }}
        />
      </div>
    </div>
  );
};

export default CreateBlog;

function isValidBlog({ title, description, category }) {
  if (!(!!title && !!description && !!category)) return false;
  if (description.lenth < 20) return false;
  if (description.lenth < 6) return false;

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
