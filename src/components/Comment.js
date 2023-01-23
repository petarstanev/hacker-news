import { getItem } from "../util/api";
import { useEffect, useState } from "react";

const Comment = (props) => {
  const parser = require("html-react-parser");

  const [comment, setComment] = useState();
  useEffect(() => {
    const getData = async () => {
      const commentDetails = await getItem(props.id);
      setComment(commentDetails);
    };
    getData();
  }, [props.id]);

  if (!comment) {
    return <p>Loading</p>;
  }

  return (
    <li>
      {comment.text && parser(comment.text)} by {comment.by} Date -
      {new Date(comment.time * 1000).toDateString()}
    </li>
  );
};

export default Comment;
