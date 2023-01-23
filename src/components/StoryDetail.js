import Comment from "./Comment";

const StoryDetail = (props) => {
  return (
    <section>
      <div className="headings">
        <h2>{props.story.title}</h2>
        <h3>
          {`${props.story.score} points by ${props.story.by} | ${new Date(
            props.story.time * 1000
          ).toDateString()}`}
        </h3>
      </div>
      <a href={props.story.url}>{props.story.url}</a>

      <h4>Comments:</h4>
      {props.story.kids &&
        props.story.kids.map((commentId) => (
          <Comment key={commentId} id={commentId} />
        ))}
    </section>
  );
};

export default StoryDetail;
