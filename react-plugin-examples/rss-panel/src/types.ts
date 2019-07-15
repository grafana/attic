export interface RssFeed {
  description: string;
  image: string;
  items: RssItem[];
  title: string;
  url: string;
}

export interface RssItem {
  created: number;
  description: string;
  link: string;
  title: string;
  url: string;
}

export interface RssOptions {
  feedUrl: string;
}

export const defaults: RssOptions = {
  feedUrl: '',
};
