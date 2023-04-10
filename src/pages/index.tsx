import { getItem, getStoriesIds } from "@/utils/api";
import { FullStory } from "@/store/stories-provider";
import StoryItem from "../components/StoryItem";
import { useEffect, useContext } from "react";
import ScrollContext from "@/store/scrollContext";

export default function DefaultCategory(props: { stories: FullStory[] }) {
  let context = useContext(ScrollContext);

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position) {
      // console.log("POSITION ", position);
      context.setScrollPosition(position);
    }
  };

  useEffect(() => {
    window.scrollTo(0, context.scrollPosition);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      // console.log("LAST", window.scrollY);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {props.stories.map((story) => (
        <StoryItem key={story.id} {...story} />
      ))}
    </>
  );
}


export async function getStaticProps() {
  const category = 'best'; //TODO remove hard coded value.
  const storiesIds = await getStoriesIds(category);
  let storiesPromises = storiesIds.map((id: string) => {
    return getItem(id);
  });

  let stories = await Promise.all(storiesPromises);
  // console.log(
  //   "FINISH Loading" + new Date().getMinutes() + ":" + new Date().getSeconds()
  // );
  return {
    // Passed to the page component as props
    props: { stories },
    revalidate: 10, // In seconds
  };
}
