
export interface FullStory {
  id: number;
  deleted?: boolean;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  by: string; //username
  time: number; // Unix time
  text?: string; //HTML
  dead?: boolean;
  parent?: number; //comment parent or the relevant story
  poll?: number; // just for poll part(answer)
  kids: number[]; //item comments
  url: string;
  score: number;
  title: string;
  parts?: string[]; //just for poll list of answers
  descendants: number[]; //total number of comments
}
