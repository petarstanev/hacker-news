export const getTopStories = async () => {
  const result = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
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
