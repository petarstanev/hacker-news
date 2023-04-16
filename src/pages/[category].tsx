import { getItem, getStoriesIds } from "@/utils/api";
import { FullStory } from "@/store/stories-provider";
import StoryItem from "../components/StoryItem";
import { useEffect, useContext } from "react";
import ScrollContext from "@/store/scrollContext";
import CategoryType from "@/interfaces/CategoryType";

export default function Category(props: { stories: FullStory[] }) {
  let context = useContext(ScrollContext);

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position) {
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
  }, [handleScroll,context.scrollPosition]);

  return (
    <>
      {props.stories &&
        props.stories.map((story) => <StoryItem key={story.id} {...story} />)}
    </>
  );
}

export async function getStaticPaths() {
  // TODO: Remove stories from the url
  return {
    paths: [
      { params: { category: "top" } },
      { params: { category: "new" } },
      { params: { category: "best" } },
      { params: { category: "ask" } },
      { params: { category: "show" } },
      { params: { category: "job" } },
    ],
    fallback: true, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context: {
  params: { category: string };
}) {
  const category = context?.params.category as CategoryType;

  const storiesIds = await getStoriesIds(category);
  let storiesPromises = storiesIds.map((id: string) => {
    return getItem(id);
  });

  let stories = await Promise.all(storiesPromises);
  return {
    // Passed to the page component as props
    props: { stories },
    revalidate: 10, // In seconds
  };
}
