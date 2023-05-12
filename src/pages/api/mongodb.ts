// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  truncateDB,
  insertStoryDetail,
  getStories,
} from "../../lib/mongodb";
import { getItem, getStoriesIds } from "@/utils/api";
import { FullStoryFormatted } from "@/store/stories-provider";
import CategoryType from "@/interfaces/CategoryType";

//http://localhost:3000/api/mongodb
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let category = req.query.category as CategoryType;
    let dateString = req.query.date as string;
    let date = new Date(dateString);
    let page = req.query.page as string;

    let stories = await getStories(category,date,parseInt(page));
    res.status(200).json(stories);
  } else if (req.method === "POST") {
    const storiesIds = await getStoriesIds("top");
    let storiesPromises = storiesIds.map((id: string) => {
      return getItem<FullStoryFormatted>(id);
    });

    let stories = await Promise.all<FullStoryFormatted>(storiesPromises);
    let storiesAndCommentsPromise  = stories.map((s) => insertStoryDetail(s));
    let storiesAndComments = await Promise.all<FullStoryFormatted>(storiesAndCommentsPromise);

    res.status(200).json({
      name: "DB updated. Added/Updated " + storiesIds.length + " stories",
    });
    //MONGO
  } else if (req.method === "DELETE") {
    let deleteCount = await truncateDB();
    res
      .status(200)
      .json({ name: "DB truncated. Removed " + deleteCount + " stories" });
  } else {
    res.status(404).json({ name: "Method not found" });
  }
}
