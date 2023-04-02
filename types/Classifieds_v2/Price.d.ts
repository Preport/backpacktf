export interface Price {
    steam?: SteamPrice;
    community?: CommunityPrice;
    suggested?: Value;
}

export interface SteamPrice {
    currency: Currency;
    short: string;
    long: string;
    raw: number;
    value: number;
}
export interface CommunityPrice {
    value: number;
    valueHigh: number;
    currency: Currency;
    raw: number;
    short: string;
    long: string;
    usd: number;
    updatedAt: number;
    difference: number;
}

export interface Value {
    raw: number;
    short: string;
    long: string;
    usd?: number;
}

export type Currency = 'keys' | 'metal' | 'usd';
