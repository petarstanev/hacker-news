import { FullStoryFormatted } from "@/interfaces/FullStoryFormatted";
import { FullStory } from "@/interfaces/FullStory";
import { timeSince, urlFormatter } from "../utils/dataFormatter";

export const getTopStoriesIds = async (
): Promise<string[]> => {
  //topstories, newstories, beststories -> 500 stories
  //askstories, showstories, jobstories -> 200 stories
  const result = await fetch(
    `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
  );
  if (!result.ok) {
    throw Error("Failed to fetch top stories");
  }

  const data = (await result.json()) as string[];
  //TODO: Add the value to config
  return data.slice(0, 100);
};

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
