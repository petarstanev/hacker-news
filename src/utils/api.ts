import { FullStory, FullStoryFormatted } from "@/store/stories-provider";
import { timeSince, urlFormatter } from "../utils/dataFormatter";
import CategoryType from "@/interfaces/CategoryType";

export const getStoriesIds = async (
  category: CategoryType
): Promise<string[]> => {
  //topstories, newstories, beststories -> 500 stories
  //askstories, showstories, jobstories -> 200 stories
  const result = await fetch(
    `https://hacker-news.firebaseio.com/v0/${category}stories.json?print=pretty`
  );
  if (!result.ok) {
    throw Error("Failed to fetch top stories");
  }

  const data = (await result.json()) as string[];
  //TODO: Add the value to config
  return data.slice(0, 100);
};

// export const getStories = async (category: string) => {
//   //topstories, newstories, beststories
//   const result = await fetch(
//     `https://hacker-news.firebaseio.com/v0/${category}.json?print=pretty`
//   );

//   if (!result.ok) {
//     throw Error("Failed to fetch top stories");
//   }

//   const data = await result.json();

//   const stories = await Promise.all(data.slice(0, 3).map(getItem));
//   return stories;
// };

let cache = new Map();

let formatData = (data: FullStory): FullStoryFormatted => {
  let formattedItem: FullStoryFormatted = data;
  if (data.url) {
    formattedItem.formattedLink = urlFormatter(data.url);
  }
  // BUG: This is not working at server side call.
  // if(data.text){
  //   formattedItem.formattedText = parse(data.text);
  // }
  return formattedItem;
};

export const getItem = async <T>(itemId: string | number) => {
  const result = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`
  );

  if (!result.ok) {
    throw Error("Failed to fetch item - " + itemId);
  }

  const data: T = await result.json();

  //TODO: Move formatting away from getting data
  // const formattedData = formatData(data);

  // saveToMongo(formattedData);

  // cache.set(itemId, { value: formattedData, time: new Date() });
  return data;
};
