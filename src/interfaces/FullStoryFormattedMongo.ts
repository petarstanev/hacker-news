import { CommentProp } from "@/components/Comment";
import { FullStoryFormatted } from "./FullStoryFormatted";
import { ObjectId } from "mongodb";

export interface FullStoryFormattedMongo extends FullStoryFormatted {
  _id?: ObjectId;
  date: Date;
  comments: CommentProp[];
}
