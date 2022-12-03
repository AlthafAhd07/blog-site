import React from "react";
import { useSelector } from "react-redux";
import { selectAlert } from "../../features/alertSlice";

import "./loader.css";
const Loading = () => {
  const { loading } = useSelector(selectAlert);

  if (loading) {
    return (
      <div className="loading" data-loading={loading}>
        <div className="half-circle-spinner">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Loading;
