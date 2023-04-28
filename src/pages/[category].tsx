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
import { getBestStoriesPerPage, insertStoryDetail } from "./mongo/mongo";

export default function Category(props: {
  stories: FullStoryFormattedMongo[];
}) {
  let [loadedStories, setLoadedStories] = useState(props.stories);
  let [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    window.addEventListener("scroll", loadMoreStories);
    return () => {
      window.removeEventListener("scroll", loadMoreStories);
    };
  }, []);

  useEffect(() => {
    if (pageNumber === 1) return;
    (async () => {
      let result = await fetch("/api/mongodb?page=" + pageNumber);
      if (result.ok) {
        let newStories = (await result.json()) as FullStoryFormattedMongo[];
        console.log(newStories);
        setLoadedStories((currentStories) => {
          if (
            newStories.length &&
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

  async function loadMoreStories() {
    if (
      document.scrollingElement &&
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.scrollingElement.scrollHeight
    ) {
      setPageNumber((x) => x + 1);
    }
  }

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
  // const storiesIds = await getStoriesIds("new");
  // let storiesPromises = storiesIds.map((id: string) => {
  //   return getItem<FullStoryFormatted>(id).then((story) =>
  //     insertStoryDetail(story)
  //   );
  // });
  // Promise.all<FullStoryFormatted>(storiesPromises);

  //MONGO
  let todayStories = await getBestStoriesPerPage(0);

  return {
    // Passed to the page component as props
    props: { stories: JSON.parse(JSON.stringify(todayStories)) },
    revalidate: 10, // In seconds
  };
}
