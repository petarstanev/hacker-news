export const getStories = async (category) => {
  //topstories, newstories, beststories
  const result = await fetch(
    `https://hacker-news.firebaseio.com/v0/${category}.json?print=pretty`
  );

  if (!result.ok) {
    throw Error("Failed to fetch top stories");
  }

  const data = await result.json();

  const stories = await Promise.all(data.slice(0, 30).map(getItem));
  return stories;
};

let cache = {};

export const getItem = async (itemId) => {
  if (cache[itemId] !== undefined) {
    // console.log("CACHE" + itemId);
    return cache[itemId].value;
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
  cache[itemId] = { value: data, time: new Date() };
  return data;
};
