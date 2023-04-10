import { FullStory, FullStoryFormatted } from "@/store/stories-provider";
import { timeSince, urlFormatter, kFormatter } from "../utils/dataFormatter";

// TODO: Add list of possible categories
export const getStoriesIds = async (category: string) => {
  //topstories, newstories, beststories -> 500 stories
  //askstories, showstories, jobstories -> 200 stories
  console.log('TEST'+ category);
  const result = await fetch(
    `https://hacker-news.firebaseio.com/v0/${category}stories.json?print=pretty`
  );
  if (!result.ok) {
    throw Error("Failed to fetch top stories");
  }

  const data = await result.json();
  //TODO: Add the value to config
  return data.slice(0, 50); 
};


export const getStories = async (category: string) => {
  //topstories, newstories, beststories
  const result = await fetch(
    `https://hacker-news.firebaseio.com/v0/${category}.json?print=pretty`
  );

  if (!result.ok) {
    throw Error("Failed to fetch top stories");
  }

  const data = await result.json();

  const stories = await Promise.all(data.slice(0, 10).map(getItem));
  return stories;
};

let cache = new Map();

let formatData = (data: FullStory): FullStoryFormatted=>{
  let formattedItem: FullStoryFormatted = data; 
  if(data.url){
    formattedItem.formattedLink = urlFormatter(data.url);
  }
  // BUG: This is not working at server side call.
  // if(data.text){
  //   formattedItem.formattedText = parse(data.text);
  // }
  return formattedItem;
} 


export const getItem = async (itemId: string) => {
  // TODO: Add caching enable flag to config
  if (cache.has(itemId)) {
    // console.log("CACHE" + itemId);
    return cache.get(itemId).value;
  } else {
    // console.log("FETCH" + itemId);
  }

  const result = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`
  );

  if (!result.ok) {
    throw Error("Failed to fetch item - " + itemId);
  }

  const data: FullStory = await result.json();

  const formattedData = formatData(data); //TODO: Move formatting away from getting data
  cache.set(itemId, { value: formattedData, time: new Date() });
  return formattedData;
};
