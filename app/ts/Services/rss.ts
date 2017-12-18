import { RssItem, Feed } from '../Interfaces/Rss';
import { IFeedMe } from './IFeedMe';
import * as request from 'request';
const FeedMe: IFeedMe = require('feedme');

const createFeedParserStream = (feed: Feed): NodeJS.WritableStream => {
    const parser = new FeedMe(true);
    parser.on('title', (title: string) => {
        feed.title = title;
    });
    parser.on('item', (item: RssItem) => {
        feed.items.push(item);
    });
    return parser;
}

const rss = (feedUrl: string): Promise < Feed > => {
    const feed: Feed = {
        title: '',
        items: []
    };
    return new Promise<Feed>((resolve, reject) => {
        request.get(feedUrl)
            .on('error', (err: Error) => {
                reject(err);
            })
            .on('end', () => {
                resolve(feed);
            })
            .pipe(createFeedParserStream(feed)); 
    });
}

export default rss;