import { RssItem } from '../Interfaces/Rss';
export interface IFeedMe {
    new(flag?: boolean): NodeJS.WritableStream;
    on(event: 'title', onTitle: (title: string) => void): void;
    on(event: 'item', onItem: (item: RssItem) => void): void;
} 