export const getStoriesIds = async (category: string) => {
  //topstories, newstories, beststories
  const result = await fetch(
    `https://hacker-news.firebaseio.com/v0/${category}.json?print=pretty`
  );

  if (!result.ok) {
    throw Error("Failed to fetch top stories");
  }

  const data = await result.json();
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

export const getItem = async (itemId: string) => {
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

  const data = await result.json();
  cache.set(itemId, { value: data, time: new Date() });
  return data;
};
