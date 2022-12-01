import React from "react";

import "./toggler.css";

const Toggler = ({ toggled, setToggled }) => {
  return (
    <div
      className="toggler"
      data-toggled={toggled}
      onClick={() => setToggled((old) => !old)}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Toggler;
