import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "../createBlog/createBlog.css";

import {
  changeLoadingState,
  showErrMsg,
  showSuccessMsg,
} from "../../features/alertSlice";
import { selectAuth } from "../../features/authSlice";
import { selectBlogs, updateSingleBlog } from "../../features/blogSlice";

import { uploadImg } from "../createBlog";

import Blog from "../blog/main/Blog";
import { editBlogApi, getSinlgeBlogApi } from "../../api/blogApi";

const initalaBlogState = {
  title: "",
  description: "",
  thumbnail: "",
  category: "Front-end",
};

const EditBlog = () => {
  const [blog, setBlog] = useState(initalaBlogState);
  const [tempImg, setTempImg] = useState();

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useGetBlog(id, setBlog);

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

    try {
      let imageUrl;
      if (tempImg) {
        imageUrl = await uploadImg(tempImg);
      }

      await editBlogApi({
        id,
        ...blog,
        thumbnail: imageUrl ? imageUrl : blog.thumbnail,
      });

      dispatch(
        updateSingleBlog({
          id,
          ...blog,
          thumbnail: imageUrl ? imageUrl : blog.thumbnail,
        })
      );

      dispatch(showSuccessMsg("blog Updated!"));
      dispatch(changeLoadingState(false));
      navigate("/");
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

function useGetBlog(id, setBlog) {
  const { allBlogs, userBlogs } = useSelector(selectBlogs);
  const { user } = useSelector(selectAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let concated = [];

    if (allBlogs) {
      concated = allBlogs.concat(userBlogs);
    }

    const checkInLocal = concated.find((blog) => blog._id === id);

    if (checkInLocal) {
      if (checkInLocal.author.userId !== user._id) {
        navigate("/");
        dispatch(showErrMsg("Invalid Authentication"));
        return;
      }

      setBlog(checkInLocal);
    }
    async function getSingleBlog() {
      try {
        const res = await getSinlgeBlogApi(id);

        if (res.data.author.userId !== user._id) {
          navigate("/");
          return;
        }
        setBlog(res.data);
      } catch (error) {
        dispatch(showErrMsg(error.response.data.msg));
      }
    }
    getSingleBlog();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
}
