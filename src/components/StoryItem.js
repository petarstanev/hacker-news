import { useContext } from "react";
import StoriesContext from "../store/stories-context";

const StoryItem = (props) => {
  const context = useContext(StoriesContext);

  let kFormatter = (num) => {
    return num > 999 ? (num / 1000).toFixed(1) + "k" : num;
  };

  let timeSince = (date) => {
    let nowUnixDate = Math.floor(new Date() / 1000);
    let seconds = nowUnixDate - date;

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  let urlFormatter = (url) => {
    return url.replace(/^https?:\/\/(www.)?/, "");
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        onClick={() => {
          window.open(props.url, "_blank", "noopener,noreferrer");
        }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          wordBreak: "break-all",
          paddingLeft: "1em",
        }}
      >
        <strong> {props.title}</strong>
        {props.url && urlFormatter(props.url)}
        <p>{`${props.score} points by ${props.by} ${timeSince(
          props.time
        )} ago`}</p>
      </div>
      <div
        onClick={context.setSelectStory.bind(null, props)}
        style={{ display: "flex", flex: "0 0 3em", justifyContent: "center" }}
      >
        C{props.kids && kFormatter(props.kids.length)}
      </div>
    </div>
  );
};

export default StoryItem;
