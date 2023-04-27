// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  truncateDB,
  insertStoryDetail,
  getNextBestStories,
} from "../mongo/mongo";
import { getItem, getStoriesIds } from "@/utils/api";
import { FullStoryFormatted } from "@/store/stories-provider";

//http://localhost:3000/api/mongodb
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let page = req.query.page as string;
    let newStories = await getNextBestStories(parseInt(page));
    res.status(200).json(newStories);
    //     console.log(newStories);
  } else if (req.method === "POST") {
    const storiesIds = await getStoriesIds("top");
    let storiesPromises = storiesIds.map((id: string) => {
      return getItem<FullStoryFormatted>(id).then((story) =>
        insertStoryDetail(story)
      );
    });

    await Promise.all<FullStoryFormatted>(storiesPromises);

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
