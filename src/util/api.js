export const getStories = async (typeStories) => {
  //topstories, newstories, beststories
  const result = await fetch(
    `https://hacker-news.firebaseio.com/v0/${typeStories}.json?print=pretty`
  );

  if (!result.ok) {
    throw Error("Failed to fetch top stories");
  }

  const data = await result.json();
  return data;
};

export const getItem = async (itemId) => {
  const result = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`
  );

  if (!result.ok) {
    throw Error("Failed to fetch item - " + itemId);
  }

  const data = await result.json();
  return data;
};
