import { getItem, getStoriesIds } from "@/utils/api";
import StoryItem from "../components/StoryItem";
import { useEffect, useState } from "react";
import CategoryType from "@/interfaces/CategoryType";
import {
  FullStoryFormattedMongo,
  getStories,
  insertStoryDetail,
} from "../lib/mongodb";
import { FullStoryFormatted } from "@/store/stories-provider";
import DateSelector from "@/components/DateSelector";

export default function Category(props: {
  stories: FullStoryFormattedMongo[];
  category: string;
}) {
  let [loadedStories, setLoadedStories] = useState(props.stories);
  let [pageNumber, setPageNumber] = useState(0);
  let [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    window.addEventListener("scroll", loadMoreStories);
    return () => {
      window.removeEventListener("scroll", loadMoreStories);
    };
  }, []);

  useEffect(() => {
    //TODO: Add check if we have made this request already
    (async () => {
      let result = await fetch(
        `/api/mongodb?category=top&date=${selectedDate.toDateString()}&page=${pageNumber}`
      );
      console.log(
        "PAGE" +
          `/api/mongodb?category=top&date=${selectedDate.toDateString()}&page=${pageNumber}`
      );
      if (result.ok) {
        let newStories = (await result.json()) as FullStoryFormattedMongo[];
        setLoadedStories((currentStories) => {
          if (
            newStories.length &&
            currentStories[currentStories.length - 1].id ===
              newStories[newStories.length - 1].id
          ) {
            console.log("update");
            return currentStories;
          }
          console.log("no update");
          return [...currentStories, ...newStories];
        });
      }
    })();
  }, [pageNumber]);

  useEffect(() => {
    (async () => {
      let result = await fetch(
        `/api/mongodb?category=top&date=${selectedDate.toDateString()}&page=${pageNumber}`
      );
      console.log(
        "DATE" +
          `/api/mongodb?category=top&date=${selectedDate.toDateString()}&page=${pageNumber}`
      );

      if (result.ok) {
        let newStories = (await result.json()) as FullStoryFormattedMongo[];
        setLoadedStories(newStories);
      }
    })();
  }, [selectedDate]);

  async function loadMoreStories() {
    if (
      document.scrollingElement &&
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.scrollingElement.scrollHeight
    ) {
      setPageNumber((x) => x + 1);
    }
  }

  let dateUpdated = (updatedDate: Date) => {
    setSelectedDate(updatedDate);
    setPageNumber(0);
  };

  return (
    <>
      <DateSelector dateUpdated={dateUpdated} />
      {loadedStories.map((story) => (
        <StoryItem key={story.id} {...story} />
      ))}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: "top" } },
      // { params: { category: "new" } },
      // { params: { category: "best" } },
      // { params: { category: "ask" } },
      // { params: { category: "show" } },
      // { params: { category: "job" } },
    ],
    fallback: false, // can also be true or 'blocking'
    //TODO: If I want to be true I need to create fallback logic if (router.isFallback) {
  };
}

export async function getStaticProps(context: {
  params: { category: string };
}) {
  //TODO : Move populate db into mongodb.

  if (process.env.API_CALL_ENABLED == "true") {
    console.log("API enabled");
    //API
    const storiesIds = await getStoriesIds("top");
    let storiesPromises = storiesIds.map<Promise<FullStoryFormatted>>((id) =>
      getItem<FullStoryFormatted>(id)
    );
    let apiStories = await Promise.all<FullStoryFormatted>(storiesPromises);
    let uploadedStories = apiStories.map<Promise<FullStoryFormattedMongo>>(
      (story) => insertStoryDetail(story)
    );

    await Promise.all<FullStoryFormattedMongo>(uploadedStories);
  } else {
    console.log("API disabled");
  }
  //MONGO
  let todaysDate = new Date();
  let todayStories = await getStories("top", todaysDate, 0);
  return {
    // Passed to the page component as props
    props: { stories: JSON.parse(JSON.stringify(todayStories)) },
    revalidate: 10, // In seconds
  };
}
