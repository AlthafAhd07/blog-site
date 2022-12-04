import React from "react";

import "./singlePostSkeleton.css";

const SinglePostSkeleton = () => {
  return (
    <div className="post__skeleton">
      <div className="skeleton__ThumbanailImg skeleton"></div>
      <div className="skeleton__date">
        <div className="skeleton-text skeleton"></div>
      </div>
      <div className="skeleton___heading">
        <div className="skeleton-text skeleton"></div>
        <div className="skeleton-text skeleton"></div>
      </div>
      <div className="skeleton__description">
        <div className="skeleton-text skeleton"></div>
        <div className="skeleton-text skeleton"></div>
        <div className="skeleton-text skeleton"></div>
        <div className="skeleton-text skeleton"></div>
        <div className="skeleton-text skeleton"></div>
      </div>
      <div className="skeleton__authorData">
        <div className="skeleton"></div>
        <section>
          <div className="skeleton-text skeleton"></div>
          <div className="skeleton-text skeleton"></div>
        </section>
      </div>
    </div>
  );
};

export default SinglePostSkeleton;
