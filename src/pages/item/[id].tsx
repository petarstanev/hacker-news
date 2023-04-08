import { getItem } from "@/utils/api";
import { FullStory } from "@/store/stories-provider";
import { timeSince, urlFormatter } from "../../utils/dataFormatter";
import Comment from "@/components/Comment";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Item(props: FullStory ) {
  const router = useRouter();
  let [text, setText] = useState<string | JSX.Element | JSX.Element[]>();
  let [timeAgo, setTimeAgo] = useState<string>();

  useEffect(() => {
    props.text && setText(parse(props.text));
  }, []);

  useEffect(() => {
    setTimeAgo(timeSince(props.time));
  }, []);

  return (
    <div className="px-4">
      <button
        onClick={() => router.back()}
        className="bg-white border border-black"
      >
        Back
      </button>
      <div>
        <h2 className="text-xl font-bold">{props.title}</h2>
        {props.text && <section>{text}</section>}

        {props.url && (
          <a href={props.url}>{urlFormatter(props.url)}</a>
        )}

        <h3 className="text-lg font-bold">
          {`${props.score} points by ${props.by} ${timeAgo} ago`}
        </h3>
      </div>

      <h4 className="font-bold">Comments:</h4>
      {props.kids &&
        props.kids.map((commentId) => (
          <Comment key={commentId} id={commentId} level={0} />
        ))}
    </div>
  );
}
export async function getServerSideProps(context: { params: { id: string } }) {
  let fullStory = await getItem(context.params.id);
  return {
    props: {...fullStory}, // will be passed to the page component as props
  };
}
