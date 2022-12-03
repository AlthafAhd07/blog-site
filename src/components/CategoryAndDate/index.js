import React from "react";

import "./categoryAndDate.css";

const CategoryAndDate = ({ category, date }) => {
  if (!category || !date) return null;
  const splitDate = new Date(date);

  const displayDate = `${splitDate.toLocaleString("en-us", {
    month: "short",
  })} ${splitDate.getDate()}, ${splitDate.getFullYear()}`;
  return (
    <section className="categoryAndDate">
      {category} <div></div> {!!displayDate && displayDate}
    </section>
  );
};

export default CategoryAndDate;
