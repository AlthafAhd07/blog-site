import React from "react";
import AuthorData from "../../../components/authorData";

const SingelComment = ({ comment }) => {
  const diff = TimeDiffFromNow(comment?.createdAt);

  return (
    <div className="singleComment">
      <AuthorData author={comment?.commentOwner} />
      <span>{diff}</span>
      <p>{comment.comment}</p>
    </div>
  );
};

export default SingelComment;

function TimeDiffFromNow(time) {
  if (!time) return;
  const t1 = new Date(time).getTime(); // created time
  const t2 = new Date().getTime(); // current time

  let diff = (t2 - t1) / 1000;
  diff /= 60;
  diff = Math.abs(Math.round(diff));
  let final;
  if (diff < 60) {
    if (diff < 1) {
      final = "just now";
    } else if (diff <= 1) {
      final = "1 min ago";
    } else {
      final = `${diff} minutes ago`;
    }
  } else if (diff < 1440) {
    const hours = Math.round(diff / 60);
    if (hours === 1) {
      final = "1 hour ago";
    } else {
      final = `${hours} hours ago`;
    }
  } else {
    const days = Math.round(diff / 1440);
    if (days === 1) {
      final = "1 day ago";
    } else {
      final = `${days} days ago`;
    }
  }

  return final;
}
