import React from "react";
import Blog from "../blog";

import "./createBlog.css";

const CreateBlog = () => {
  return (
    <div className="createBlog">
      <div className="create">
        <h2>Create Blog</h2>
        <form className="createBlog__form">
          <label htmlFor="blogTitile">Title :</label>
          <input type="text" id="blogTitile" />
          <label htmlFor="">
            Upload Image : <input type="file" />
          </label>

          <label htmlFor="blogContent">Content :</label>
          <textarea name="" id="blogContent"></textarea>
          <label>
            Category :
            <select>
              <option name="" id="">
                Hi
              </option>
              <option name="" id="">
                Hi
              </option>
              <option name="" id="">
                Hi
              </option>
              <option name="" id="">
                Hi
              </option>
            </select>
          </label>

          <label htmlFor="blogTags">Tags :</label>
          <input type="text" id="blogTags" />
          <button>Create Blog</button>
        </form>
      </div>
      <div className="preview">
        <h2>Preview</h2>
        <Blog />
      </div>
    </div>
  );
};

export default CreateBlog;
