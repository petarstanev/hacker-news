import { useState } from "react";
import { useGetItem } from "../hooks/useGetItem";
import { timeSince } from "../utils/dataFormatter";
interface CommentProp {
  id: number;
  kids: number[];
  by: string;
  time: number;
  text: string;
}

const Comment = (props: { id: number; level: number }) => {
  const [comment, loading] = useGetItem<CommentProp>(props.id);
  const parser = require("html-react-parser");
  const [subComments, setSubComments] = useState<number[]>([]);
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
    <div className={"p-4 border border-black"}>
      <div className="flex justify-between">
        <p>{comment.by}</p>
        <p>{timeSince(comment.time)} ago</p>
      </div>
      <div className="overflow-auto">
        {comment.text && parser(comment.text)}
      </div>
      {comment.kids && (
        <button
          onClick={repliesButtonClickHandler}
          className="border border-black"
        >
          {`${showSubComments ? "Hide " : "Show "} ${
            comment.kids.length
          } replies`}
        </button>
      )}
      <div className="ml-4">
        {showSubComments &&
          subComments.map((subComment) => (
            <Comment key={subComment} id={subComment} level={props.level + 1} />
          ))}
      </div>
    </div>
  );
};

export default Comment;
