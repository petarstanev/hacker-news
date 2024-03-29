import { useEffect, useState } from "react";
import { timeSince, urlFormatter } from "../utils/dataFormatter";
import { FaRegComment } from "react-icons/fa";
import { FullStoryFormatted } from "@/interfaces/FullStoryFormatted";
import Link from "next/link";
import parse from "html-react-parser";

const StoryItem = (props: FullStoryFormatted) => {
  // TODO: Move this logic into a new hook.
  let [formattedText, setFormattedText] = useState<
    string | JSX.Element | JSX.Element[]
  >();
  const [time, setTime] = useState("");

  useEffect(() => {
    //TODO: check if time gets updated after a minute
    props.text && setFormattedText(parse(props.text));
  }, [props.text]);

  useEffect(() => {
    setTime(new Date(props.time*1000).toISOString());
  }, [props.time]);

  return (
    <div className="flex flex-col border-b px-4">
      <Link className="flex-1 flex-wrap break-words" href={"/item/" + props.id}>
        <strong>{props.title}</strong>
      </Link>
      {props.url && (
        <Link
          className="text-sky-600 hover:underline"
          href={props.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {props.formattedLink}
        </Link>
      )}

      {props.text && <div className="line-clamp-2 ">{formattedText}</div>}

      <Link href={"/item/" + props.id}>
        <p className="pt-2">{`${props.score} points ${
          props.kids ? props.kids.length : "0"
        } comments`}</p>
        <p>
          {props.by} 
        </p>
        <p>
          {time} 
        </p>
      </Link>
    </div>
  );
};

export default StoryItem;
