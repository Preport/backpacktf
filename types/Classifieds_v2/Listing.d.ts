import { v2Item } from './Item';
import { Value } from './Price';
import { User, UserAgent } from './User';

export interface v2Listing {
    id: string;
    steamid: string;
    appid: number;
    currencies: ListingCurrencies;
    value: Value;
    tradeOffersPreferred: boolean;
    buyoutOnly: boolean;
    details?: string;
    listedAt: number;
    bumpedAt: number;
    intent: ListingIntent;
    count: number;
    status: ListingStatus;
    source: ListingSource;
    item: v2Item;
    userAgent?: UserAgent;
    user: User;
    deal?: Deal;
}

export interface ListingCurrencies {
    metal?: number;
    keys?: number;
}
export interface Deal {
    percent: number;
    value: number;
}
export type ListingIntent = 'buy' | 'sell';
export type ListingStatus = 'active' | 'notEnoughCurrency' | 'hiddenByUser';
export type ListingSource = 'user' | 'userAgent' | 'marketplaceTf';
