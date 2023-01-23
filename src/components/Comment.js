import useGetItem from "../hooks/useGetItem";

const Comment = (props) => {
  const [comment, loading] = useGetItem(props.id);
  const parser = require("html-react-parser");

  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <article>
      {comment.text && parser(comment.text)}
      <footer>
        {comment.by} | {new Date(comment.time * 1000).toDateString()}
      </footer>
    </article>
  );
};

export default Comment;
