import { useContext } from "react";
import { timeSince, urlFormatter, kFormatter } from "../utils/dataFormatter";
import StoriesContext from "../store/stories-context";
import { FaRegComment } from "react-icons/fa";

const StoryItem = (props: {
  url: string;
  title: string;
  score: string;
  by: string;
  time: number;
  kids: string[];
}) => {
  const context = useContext(StoriesContext);

  return (
    <div className="flex border-b-black">
      <div
        onClick={() => {
          window.open(props.url, "_blank", "noopener,noreferrer");
        }}
        className="flex-1 flex-wrap break-words pl-4 border-b-black border "
      >
        <p>
          <strong> {props.title}</strong>
        </p>
        <p>{props.url && urlFormatter(props.url)}</p>
        <p>{`${props.score} points by ${props.by} ${timeSince(
          props.time
        )} ago`}</p>
      </div>
      <div
        onClick={context.setSelectStory.bind(null, props)}
        className="flex w-32 flex-col flex-wrap justify-center items-center border border-l-black border-b-black"
      >
        <FaRegComment size="1.5em" />
        {props.kids && <p>{kFormatter(props.kids.length)}</p>}
      </div>
    </div>
  );
};

export default StoryItem;
