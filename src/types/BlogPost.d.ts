export type Post = {
  id: string;
  bannerSrc?: string;
  bannerAlt?: string;
  cardTitle: string;
  cardAuthor?: string;
  cardDate: string; // Using string for date to simplify serialization
  cardBrief?: string;
  postTitle: string;
  postContent?: string;
};
