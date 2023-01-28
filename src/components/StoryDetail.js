import { useContext } from "react";
import StoriesContext from "../store/stories-context";
import Comment from "./Comment";

const StoryDetail = () => {
  const context = useContext(StoriesContext);
  if (!context.selectedStory) return;

  return (
    <section>
      <div className="headings">
        <h2>{context.selectedStory.title}</h2>
        <h3>
          {`${context.selectedStory.score} points by ${
            context.selectedStory.by
          } | ${new Date(context.selectedStory.time * 1000).toDateString()}`}
        </h3>
      </div>
      <a href={context.selectedStory.url}>{context.selectedStory.url}</a>

      <h4>Comments:</h4>
      {context.selectedStory.kids &&
        context.selectedStory.kids.map((commentId) => (
          <Comment key={commentId} id={commentId} />
        ))}
    </section>
  );
};

export default StoryDetail;
