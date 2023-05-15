import { CommentProp } from "@/components/Comment";
import { FullStoryFormatted } from "@/interfaces/FullStoryFormatted";
import { FullStory } from "@/interfaces/FullStory";
import { getItem } from "@/utils/api";
import clientPromise from "./mongodbClient";
import { FullStoryFormattedMongo } from "@/interfaces/FullStoryFormattedMongo";

//TODO move to helper function *1000
let getTime = (time: number) => {
  let date = new Date(time * 1000);
  // date.setHours(0, 0, 0, 0);
  return date;
};

// TODO: make it work with single story
export let uploadStories = async (stories: FullStory[]) => {
  // let dateNoTime = new Date(story.time * 1000).setHours(0,0,0,0);
  let client = await clientPromise;
  let db = client.db();
  let  collection = db.collection('stories');

  let storiesPromises = stories.map(async (story) => {
    let mongoStory: FullStoryFormattedMongo = {
      ...story,
      date: getTime(story.time),
      comments: [],
    };
    
    // let res = await collection.createIndex( { "id": 1 }, { unique: true } );
    return collection.updateOne(
      { id: mongoStory.id },
      { $set: mongoStory },
      { upsert: true }
    );
  });

  let result = await Promise.all(storiesPromises);
  // the following code examples can be pasted here...
  return "done.";
};

export let insertStoryDetail = async (
  story: FullStoryFormatted
): Promise<FullStoryFormattedMongo> => {

  let client = await clientPromise;
  let db = client.db();
  let  collection = db.collection('stories');

  let mongoStory: FullStoryFormattedMongo = {
    ...story,
    date: getTime(story.time),
    comments: [],
  };

  if (mongoStory.kids && mongoStory.kids.length) {
    let commentsPromises = mongoStory.kids.map((commentId) => {
      return getItem<CommentProp>(commentId);
    });

    let comments = await Promise.all(commentsPromises);

    mongoStory.comments = comments;
  }

  await collection.updateOne(
    { id: mongoStory.id },
    { $set: mongoStory },
    { upsert: true }
  );

  return mongoStory;
};

export let getStoryDetails = async (id: number) => {
  let client = await clientPromise;
  let db = client.db();
  let  collection = db.collection('stories');

  await client.connect(); //TODO check where to move this
  const foundStory = await collection.findOne<FullStoryFormattedMongo>({ id });
  return foundStory;
};

export let getBestStories = async (date: Date, pageNumber: number) => {
  date.setHours(0, 0, 0, 0);

  let dateMidnight = new Date(date);
  dateMidnight.setHours(23, 59, 69);

  const pageSize = 10;
  let client = await clientPromise;
  let db = client.db();
  let  collection = db.collection('stories');


  const foundStory = await collection
    .find<FullStoryFormattedMongo>({
      date: { $gt: date, $lt: dateMidnight},
    })
    .sort({ score: -1, id: 1 }) //TODO check if I need to create index
    .skip(pageNumber * pageSize) //page multiply by limit
    .limit(pageSize)
    .toArray();

  return foundStory;
};

export let truncateDB = async () => {
  let client = await clientPromise;
  let db = client.db();
  let  collection = db.collection('stories');

  let result = await collection.deleteMany({});
  return result.deletedCount;
};
