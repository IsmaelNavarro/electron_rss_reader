export interface RssItem {
    description: string;
    link: string;
    pubdate: string;
    title: string;
}

export interface Feed {
    title: string;
    items: RssItem[];
}