import { getItem } from "@/utils/api";
import { FullStory, FullStoryFormatted } from "@/store/stories-provider";
import { timeSince, urlFormatter } from "../../utils/dataFormatter";
import Comment from "@/components/Comment";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import Link from "next/link";

// import { useRouter } from "next/router";

export default function Item(props: FullStoryFormatted) {
  // const router = useRouter();
  let [formattedText, setFormattedText] = useState<
    string | JSX.Element | JSX.Element[]
  >();
  let [timeAgo, setTimeAgo] = useState<string>();

  //TODO: Move this in server rendering or somewhere else
  useEffect(() => {
    props.text && setFormattedText(parse(props.text));
  }, []);

  useEffect(() => {
    setTimeAgo(timeSince(props.time));
  }, []);

  {
    /* TODO: Test on phone if we need back button or not */
  }
  {
    /* <button
        onClick={() => router.back()}
        className="bg-white border border-black"
      >
        Back
      </button> */
  }
  return (
    <article>
      <div className="px-4">
        <h2 className="text-xl font-bold">{props.title}</h2>
        {props.text && <section className="py-2">{formattedText}</section>}

        {props.url && (
          <Link
            className="py-2 line-clamp-2 text-sky-600 hover:underline"
            href={props.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {props.url}
          </Link>
        )}

        <h3>{`${props.score} points by ${props.by} ${timeAgo} ago`}</h3>
      </div>
      <aside>
        {props.kids ? (
          <>
            <h4 className="font-bold pt-2 px-4">Comments:</h4>
            {props.kids.map((commentId) => (
              <Comment key={commentId} id={commentId} level={0} />
            ))}
          </>
        ) : (
          <h4 className="py-2">No comments yet</h4>
        )}
      </aside>
    </article>
  );
}
export async function getServerSideProps(context: { params: { id: string } }) {
  let fullStory = await getItem(context.params.id);
  return {
    props: { ...fullStory }, // will be passed to the page component as props
  };
}
