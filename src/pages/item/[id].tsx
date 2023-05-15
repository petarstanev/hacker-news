import { FullStoryFormatted } from "@/interfaces/FullStoryFormatted";
import Comment from "@/components/Comment";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoryDetails } from "../../lib/mongodb";
import { FullStoryFormattedMongo } from "@/interfaces/FullStoryFormattedMongo";

export default function Item(props: { story: FullStoryFormattedMongo }) {
  let [formattedText, setFormattedText] = useState<
    string | JSX.Element | JSX.Element[]
  >();
  let [timeAgo, setTimeAgo] = useState<string>();
  let [story, setStory] = useState<FullStoryFormatted>();

  useEffect(() => {
    (async () => {
      // var startTime = performance.now();
      // let fullStory = await getItem<FullStoryFormatted>("35598917"); //change param.id
      // // var endTime = performance.now();
      // // console.log(`Took ${endTime - startTime} milliseconds`);
      setStory(props.story);
      //
    })();
  }, [props.story]);

  // useEffect(() => {
  //   story && story.text && setFormattedText(parse(story.text));
  // }, [story.text]);

  // useEffect(() => {
  //   story && setTimeAgo(timeSince(story.time));
  // }, [story.time]);

  if (!story) {
    return <p>Error</p>;
  }

  return (
    <article>
      <div className="px-4">
        <h2 className="text-xl font-bold">{story.title}</h2>
        {story.text && <section className="py-2">{formattedText}</section>}

        {story.url && (
          <Link
            className="py-2 line-clamp-2 text-sky-600 hover:underline"
            href={story.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {story.url}
          </Link>
        )}

        <h3>{`${story.score} points by ${story.by} ${timeAgo} ago`}</h3>
      </div>
      <aside>
        {story.kids ? (
          <>
            <h4 className="font-bold pt-2 px-4">Comments:</h4>
            {story.kids.map((commentId) => (
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
  let story = await getStoryDetails(parseInt(context.params.id));

  let serialize = JSON.parse(JSON.stringify(story));

  return {
    props: { story: serialize }, // will be passed to the page component as props
  };
}
