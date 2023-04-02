/**
 * This type may not be up to date and will likely be updated in the future versions
 */
export interface v2CreateBuyListing {
    item: v2BuyItem;
    details: string;
    currencies: {
        metal: number;
        keys: number;
    };
}
/**
 * This type may not be up to date and will likely be updated in the future versions
 */
export interface v2CreateSellListing {
    id: string;
    details: string;
    currencies: {
        metal: number;
        keys: number;
    };
}
/**
 * This type may not be up to date and will likely be updated in the future versions
 */
export interface v2BuyItem {
    baseName: string;
    quality: { id: number };
    australium?: boolean;
    craftable?: boolean;
    crateSeries?: number;
    tradable?: boolean;
    festivized?: boolean;
    killstreak?: {
        tier: number;
        killstreaker: string;
        sheen: string;
    };
    quantity?: number;
    rarity?: { id: number };
    paint?: { id: number };
    particle?: { id: number };
    elevatedQuality?: { id: number };
}
