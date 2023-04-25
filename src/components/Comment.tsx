import { useState } from "react";
import { useGetItem } from "../hooks/useGetItem";
import { timeSince } from "../utils/dataFormatter";
export interface CommentProp {
  id: number;
  kids: number[];
  by: string;
  time: number;
  text: string;
}

const Comment = (props: { id: number; level: number }) => {
  const parser = require("html-react-parser");
  const [comment, loading] = useGetItem<CommentProp>(props.id);
  const [subComments, setSubComments] = useState<number[]>([]);
  const [showSubComments, setShowSubComments] = useState(false);
  const [expand, setExpand] = useState(true);

  const repliesButtonClickHandler = () => {
    setShowSubComments((show) => {
      show = !show;
      if (show && comment) {
        setSubComments(comment.kids);
      }
      return show;
    });
  };

  if (loading) {
    return <p>Loading</p>;
  }

  if (!comment) {
    return <p>Error...</p>;
  }

  const commentCollapseHandler = () => {
    setExpand((current) => !current);
  };

  if (!expand) {
    return (
      <div
        className={"border-t py-2 flex flex-col"}
        onClick={commentCollapseHandler}
      >
        <div className="px-4">
          <div className="flex justify-between">
            <b>{comment.by}</b>
            <p>{timeSince(comment.time)} ago</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={"border-t pt-2 flex flex-col"}>
      <div className="px-4" onClick={commentCollapseHandler}>
        <div className="flex justify-between">
          <b>{comment.by}</b>
          <p>{timeSince(comment.time)} ago</p>
        </div>
        <div className="pb-2 overflow-auto">
          {comment.text && parser(comment.text)}
        </div>
      </div>

      {!showSubComments && comment.kids && (
        <button
          onClick={repliesButtonClickHandler}
          className="pl-4 py-1 flex self-stretch border-t text-sky-600 hover:underline"
        >
          {`${comment.kids.length} more replies`}
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
