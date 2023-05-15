import { FullStory } from "./FullStory";

export interface FullStoryFormatted extends FullStory {
  formattedLink?: string;
  formattedText?: string | JSX.Element | JSX.Element[]; //parsed HTML
}
