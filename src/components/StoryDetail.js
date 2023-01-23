import Comment from "./Comment";

const StoryDetail = (props) => {


    
  return (
    <article>
      <header>{props.story.title}</header>
      URL{props.story.url}
      {props.story.score} points by {props.story.by} date{" "}
      {new Date(props.story.time * 1000).toDateString()}
      <footer>
        Comments:
        <ul>
          {props.story.kids.map((commentId) => (
            <Comment key={commentId} id={commentId} />
          ))}
        </ul>
      </footer>
    </article>
  );
};

export default StoryDetail;
