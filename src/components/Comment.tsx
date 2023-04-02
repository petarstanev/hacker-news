import { useState } from "react";
import { useGetItem } from "../hooks/useGetItem";
import { timeSince } from "../utils/dataFormatter";
interface CommentProp {
  id: string;
  kids: string[];
  by: string;
  time: string;
  text: string;
}

const Comment = (props: { id: string; level: number }) => {
  const [comment, loading] = useGetItem<CommentProp>(props.id);
  const parser = require("html-react-parser");
  const [subComments, setSubComments] = useState<string[]>([]);
  const [showSubComments, setShowSubComments] = useState(false);

  const repliesButtonClickHandler = () => {
    if (showSubComments) {
      setShowSubComments(false);
    } else if (comment) {
      setShowSubComments(true);
      setSubComments(comment.kids);
    }
  };

  if (loading) {
    return <p>Loading</p>;
  }

  if (!comment) {
    return <p>Error...</p>;
  }

  return (
    <div style={{ paddingLeft: props.level + "em" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>{comment.by}</p>
        <p>{timeSince(comment.time)} ago</p>
      </div>
      <div>{comment.text && parser(comment.text)}</div>
      {comment.kids && (
        <button onClick={repliesButtonClickHandler}>
          {`${showSubComments ? "Hide " : "Show "} ${
            comment.kids.length
          } replies`}
        </button>
      )}

      {showSubComments &&
        subComments.map((subComment) => (
          <Comment key={subComment} id={subComment} level={props.level + 1} />
        ))}
    </div>
  );
};

export default Comment;
