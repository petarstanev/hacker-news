import { useGetItem } from "../hooks/useGetItem";
import { timeSince } from "../utils/dataFormatter";

const Comment = (props) => {
  const [comment, loading] = useGetItem(props.id);
  const parser = require("html-react-parser");

  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>{comment.by}</p>
        <p>{timeSince(comment.time)} ago</p>
      </div>
      <div>{comment.text && parser(comment.text)}</div>
      {comment.kids && <button>{comment.kids.length} replies</button>}
    </div>
  );
};

export default Comment;
