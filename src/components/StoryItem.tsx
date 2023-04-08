import { useEffect, useState } from "react";
import { timeSince, urlFormatter, kFormatter } from "../utils/dataFormatter";
import { FaRegComment } from "react-icons/fa";
import { FullStory } from "../store/stories-provider";
import Link from "next/link";

const StoryItem = (props: FullStory) => {
  const [timeAgo, setTimeAgo] = useState("");
  useEffect(() => {
    setTimeAgo(timeSince(props.time));
  }, [props.time]);

  return (
    <div className="flex border-b-black">
      {props.url ? (
        <Link
          className="flex-1 flex-wrap break-words pl-4 border-b-black border"
          href={props.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <strong>{props.title}</strong>
          <p>{props.url && urlFormatter(props.url)}</p>
          <p>{`${props.score} points by ${props.by} ${timeAgo} ago`}</p>
        </Link>
      ) : (
        <div className="flex-1 flex-wrap break-words pl-4 border-b-black border">
          <p>
            <strong> {props.title}</strong>
          </p>
          <p>{props.url && urlFormatter(props.url)}</p>
          <p>{`${props.score} points by ${props.by} ${timeAgo} ago`}</p>
        </div>
      )}
      <Link
        href={"/item/" + props.id}
        className="flex w-32 flex-col flex-wrap justify-center items-center border border-l-black border-b-black"
      >
        <FaRegComment size="1.5em" />
        {props.kids && <p>{kFormatter(props.kids.length)}</p>}
      </Link>
    </div>
  );
};

export default StoryItem;
