import { createAction } from 'redux-actions';
import * as vo from '../Constants';
import { IMenuItem, RssItem, Feed, IMenuRssPayload } from '../Interfaces';
import Menu from '../Services/Menu';
import rss from '../Services/rss';
const menu = new Menu(vo.MENU_STORAGE_NS);

const feedActions = {

    toggleOpenAddFeed: createAction<boolean, boolean>(
        vo.TOGGLE_ADD_FEED, (toggle: boolean) => toggle
    ),

    setActiveFeed: createAction<string, string>(
        vo.SET_ACTIVE_FEED, (url: string) => url
    ),


    setFeedError: createAction<string, string>(
        vo.SET_FEED_ERROR, (msg: string) => msg
    ),

    removeFeed: createAction<IMenuItem[], string>(
        vo.REMOVE_FEED, (url: string) => menu.remove(url)
    ),

    fetchFeed: createAction<Promise<Feed>, string>(
        vo.FETCH_FEED, async (url: string) => await rss(url)
    ),

    addFeed: createAction<Promise<IMenuItem[]>, string>(
        vo.ADD_FEED,
        async (url: string) => {
            if (menu.items.find(item => item.url === url)) {
                throw new Error("This feed is already in the list");
            }
            const feed = await rss(url);
            if (!feed.title) {
                throw new Error("Unsupported format");
            }
            return menu.add(url, feed.title);
        }
    ),

    fetchMenu: createAction<Promise<IMenuRssPayload>>(
        vo.FETCH_MENU, async () => {
            menu.load();
            let promises = menu.items.map(item => rss(item.url));
            return Promise.all(promises)
                .then((feeds: Feed[]) => {
                    if (!feeds.length) {
                        return { menuItems: [], rssItems: [] };
                    }
                    let all = feeds
                        .map(feed => feed.items)
                        // combine [[items],[item]] in a flat array 
                        .reduce((acc: RssItem[], items: RssItem[]) =>
                            acc.concat(items))
                        // sort the list by publication date DESC 
                        .sort((a, b) => {
                            let aDate = new Date(a.pubdate),
                                bDate = new Date(b.pubdate);
                            return bDate.getTime() - aDate.getTime();
                        })
                        .slice(0, vo.FEED_ITEM_PER_PAGE);
                    return { menuItems: menu.items, rssItems: all };
                });
        }
    )
}; 