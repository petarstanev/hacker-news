import { useContext } from "react";
import { timeSince, urlFormatter, kFormatter } from "../utils/dataFormatter";
import StoriesContext from "../store/stories-context";
import { FaRegComment } from "react-icons/fa";

const StoryItem = (props) => {
  const context = useContext(StoriesContext);

  return (
    <div style={{ display: "flex", borderBottom: "1px solid black" }}>
      <div
        onClick={() => {
          window.open(props.url, "_blank", "noopener,noreferrer");
        }}
        style={{
          flex: "1",
          flexWrap: "wrap",
          wordBreak: "break-all",
          paddingLeft: "1em",
        }}
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
        style={{
          display: "flex",
          flex: "0 0 4em",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          borderLeft: "1px solid black",
        }}
      >
        <FaRegComment size="1.5em" />
        {props.kids && <p>{kFormatter(props.kids.length)}</p>}
      </div>
    </div>
  );
};

export default StoryItem;
