import { useContext } from "react";
import StoriesContext from "../store/stories-context";
import Comment from "./Comment";
import { timeSince, urlFormatter } from "../utils/dataFormatter";

const StoryDetail = () => {
  const context = useContext(StoriesContext);
  
  if (!context.selectedStory) return;
  
  let backButtonHandler = () => {
    context.setSelectStory(null);
  };

  return (
    <div style={{ padding: "0 1em" }}>
      <button
        onClick={backButtonHandler}
        style={{ backgroundColor: "white", border: "1px solid black" }}
      >
        {"<"} Back
      </button>
      <div>
        <h2>{context.selectedStory.title}</h2>
        <p>
          {context.selectedStory.url && (
            <a href={context.selectedStory.url}>
              {urlFormatter(context.selectedStory.url)}
            </a>
          )}
        </p>

        <h3>
          {`${context.selectedStory.score} points by ${
            context.selectedStory.by
          } ${timeSince(context.selectedStory.time)} ago`}
        </h3>
      </div>

      <h4>Comments:</h4>
      {context.selectedStory.kids &&
        context.selectedStory.kids.map((commentId) => (
          <Comment key={commentId} id={commentId} level={0} />
        ))}
    </div>
  );
};

export default StoryDetail;
