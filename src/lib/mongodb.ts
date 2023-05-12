import { CommentProp } from "@/components/Comment";
import CategoryType from "@/interfaces/CategoryType";
import Category from "@/pages/[category]";
import { FullStory, FullStoryFormatted } from "@/store/stories-provider";
import { getItem } from "@/utils/api";
import { MongoClient, ObjectId } from "mongodb";

export interface FullStoryFormattedMongo extends FullStoryFormatted {
  _id?: ObjectId;
  date: Date;
  comments: CommentProp[];
}

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.6z1p5mw.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(MONGODB_URI);

// Database Name
const dbName = "stories";
const db = client.db(dbName);
const collection = db.collection("stories");

//TODO move to helper function *1000
let getTime = (time: number) => {
  let date = new Date(time * 1000);
  // date.setHours(0, 0, 0, 0);
  return date;
};

// TODO: make it work with single story
export let uploadStories = async (stories: FullStory[]) => {
  // let dateNoTime = new Date(story.time * 1000).setHours(0,0,0,0);

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
  await client.connect(); //TODO check where to move this

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
  await client.connect(); //TODO check where to move this
  const foundStory = await collection.findOne<FullStoryFormattedMongo>({ id });
  return foundStory;
};

export let getStories = async (
  category: CategoryType,
  date: Date,
  pageNumber: number
) => {
  if (category === "top") {
    return getBestStories(date, pageNumber);
  } else if (category === "new") {
    console.log("NEW");
    return getNewStories(pageNumber);
  }
  let empty: FullStoryFormattedMongo[] = []; //TODO: Remove this
  return empty;
};

let getBestStories = async (date: Date, pageNumber: number) => {
  date.setHours(0, 0, 0, 0);

  let dateMidnight = new Date(date);
  dateMidnight.setHours(23, 59, 69);

  console.log(date,dateMidnight,pageNumber);
  const pageSize = 10;
  await client.connect(); //TODO check where to move this

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

let getNewStories = async (pageNumber: number) => {
  const pageSize = 10;
  await client.connect(); //TODO check where to move this

  const foundStory = (await collection
    .find()
    .sort({ time: -1 }) //TODO check if I need to create index
    .skip(pageNumber * pageSize) //page multiply by limit
    .limit(pageSize)
    .toArray()) as FullStoryFormattedMongo[];

  return foundStory;
};

export let truncateDB = async () => {
  await client.connect(); //TODO check where to move this

  let result = await collection.deleteMany({});
  return result.deletedCount;
};
