import { useContext } from "react";
import StoriesContext from "../store/stories-context";
import Comment from "./Comment";
import { timeSince, urlFormatter } from "../utils/dataFormatter";

const StoryDetail = () => {
  const context = useContext(StoriesContext);

  let backButtonHandler = () => {
    context.setSelectStory(null);
  };

  if (!context.selectedStory) return <p>Story not found</p>;

  return (
    <div className="px-4">
      <button
        onClick={backButtonHandler}
        className="bg-white border border-black"
      >
        Back
      </button>
      <div>
        <h2 className="text-xl font-bold">{context.selectedStory.title}</h2>
        <p>
          {context.selectedStory.url && (
            <a href={context.selectedStory.url}>
              {urlFormatter(context.selectedStory.url)}
            </a>
          )}
        </p>

        <h3 className="text-lg font-bold">
          {`${context.selectedStory.score} points by ${
            context.selectedStory.by
          } ${timeSince(context.selectedStory.time)} ago`}
        </h3>
      </div>

      <h4 className="font-bold">Comments:</h4>
      {context.selectedStory.kids &&
        context.selectedStory.kids.map((commentId) => (
          <Comment key={commentId} id={commentId} level={0} />
        ))}
    </div>
  );
};

export default StoryDetail;
