export type Post = {
  id: string;
  banner: {
    src: string,
    alt: string,
  },
  card: {
    title: string;
    author: string;
    date: Date;
    brief: string;
  };
  post: {
    title: string;
    content: React.ReactNode[];
  };
};
