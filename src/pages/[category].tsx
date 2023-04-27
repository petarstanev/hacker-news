import { getItem, getStoriesIds } from "@/utils/api";
import {
  FullStory,
  FullStoryFormatted,
  FullStoryFormattedMongo,
} from "@/store/stories-provider";
import StoryItem from "../components/StoryItem";
import { useEffect, useContext, useState } from "react";
import ScrollContext from "@/store/scrollContext";
import CategoryType from "@/interfaces/CategoryType";
import { getTodayBestStories, insertStoryDetail } from "./mongo/mongo";

export default function Category(props: {
  stories: FullStoryFormattedMongo[];
}) {
  let [loadedStories, setLoadedStories] = useState(props.stories);
  let [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (pageNumber === 1) return;
    (async () => {
      let result = await fetch("/api/mongodb?page=" + pageNumber);
      if (result.ok) {
        let newStories = (await result.json()) as FullStoryFormattedMongo[];
        console.log(newStories);
        setLoadedStories((currentStories) => {
          if (
            currentStories[currentStories.length - 1].id ===
            newStories[newStories.length - 1].id
          ) {
            return currentStories;
          }

          return [...currentStories, ...newStories];
        });
      }
    })();
  }, [pageNumber]);

  // let context = useContext(ScrollContext);

  // const handleScroll = () => {
  //   const position = window.pageYOffset;
  //   if (position) {
  //     context.setScrollPosition(position);
  //   }
  // };

  // useEffect(() => {
  //   console.log('SCROLL')
  //   window.scrollTo(0, context.scrollPosition);
  //   window.addEventListener("scroll", handleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [handleScroll, context.scrollPosition]);

  return (
    <>
      {loadedStories.map((story) => (
        <StoryItem key={story.id} {...story} />
      ))}
      <button
        onClick={() => {
          setPageNumber((x) => x + 1);
        }}
      >
        Load more
      </button>
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
  // //API
  // const category = context?.params.category as CategoryType;

  // const storiesIds = await getStoriesIds(category);
  // let storiesPromises = storiesIds.map((id: string) => {
  //   return getItem<FullStoryFormatted>(id).then((story) =>
  //     insertStoryDetail(story)
  //   );
  // });

  // Promise.all<FullStoryFormatted>(storiesPromises);

  //MONGO
  var startTime = performance.now();
  let todayStories = await getTodayBestStories();
  var endTime = performance.now();

  // console.log(`getTodayStories() took ${endTime - startTime} milliseconds`);

  return {
    // Passed to the page component as props
    props: { stories: JSON.parse(JSON.stringify(todayStories)) },
    revalidate: 10, // In seconds
  };
}
