import { ClassifiedItemBuy, ClassifiedItemSell } from './Item';

export type Listing = {
    id: string;
    steamid: string;
    item: ClassifiedItemBuy | ClassifiedItemSell;
    appid: number;
    currencies: {
        metal?: number;
        keys?: number;
    };
    offers: 0 | 1;
    buyout: 0 | 1;
    details: string;
    created: number;
    bump: number;
    intent: 'buy' | 'sell';
    automatic: 0 | 1;
};

export type classifiedApiResponse = {
    buy: {
        fold: boolean;
        listings: {
            appid: 440;
            automatic: 1 | 0;
            bump: number;
            buyout: 1 | 0;
            created: number;
            currencies: {
                metal?: number;
                keys?: number;
            };
            details: string;
            id: string;
            item: ClassifiedItemBuy;
            intent: 0;
            offers: 0 | 1;
            steamid: string;
        }[];
        total: number;
    };
    sell: {
        fold: boolean;
        listings: {
            appid: 440;
            automatic: 1 | 0;
            bump: number;
            buyout: 1 | 0;
            created: number;
            currencies: {
                metal?: number;
                keys?: number;
            };
            details: string;
            id: string;
            item: ClassifiedItemSell;
            intent: 1;
            offers: 0 | 1;
            steamid: string;
        }[];
        total: number;
    };
    page_size: number;
    skip: number;
    total: number;
    message?: string;
};
