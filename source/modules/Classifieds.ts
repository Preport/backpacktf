import BackpackTF from '../index';
import sku from '@tf2autobot/tf2-sku';
import schema from '@tf2autobot/tf2-schema';
import { Killstreak, Sheen, Paints } from './Enums';

export default class Classifieds {
    private readonly backpacktf: BackpackTF;
    constructor(bp: BackpackTF) {
        this.backpacktf = bp;
    }

    /**
     * Converts an sku to v2 listing
     */
    skuToListing(
        tf2Sku: string,
        schemaOrItemBaseName: schema.Schema | string,
        price: { metal: number; keys: number },
        details: string = '',
        extras?: {
            killstreak?: {
                ks: Killstreak;
                sheen: Sheen;
            };
        }
    ) {
        const skObj = sku.fromString(tf2Sku);
        const itemName =
            typeof schemaOrItemBaseName === 'string'
                ? schemaOrItemBaseName
                : schemaOrItemBaseName.getName({ defindex: skObj.defindex, quality: 6 }, false);

        const item = {
            baseName: itemName,
            quality: { id: skObj.quality },
            australium: skObj.australium,
            craftable: skObj.craftable,
            elevatedQuality: skObj.quality2 ? { id: skObj.quality2 } : null,
            killstreak: skObj.killstreak
                ? {
                      tier: skObj.killstreak,
                      killstreaker: Killstreak[extras.killstreak.ks],
                      sheen: Sheen[extras.killstreak.sheen]
                  }
                : null,
            paint: skObj.paint ? { id: Paints['p' + skObj.paint] } : null,
            particle: skObj.effect ? { id: skObj.effect } : null,
            festivized: skObj.festive,
            crateSeries: skObj.crateseries,
            tradable: skObj.tradable,
            quantity: 1
        };
        Object.keys(item).forEach(key => {
            if (item[key] === null) delete item[key];
        });
        return {
            currencies: price,
            details,
            item
        } as BackpackTF.Classifieds.v2CreateBuyListing;
    }

    /**
     * Search classifieds
     * @param query part after the ?
     * @returns Promise<BackpackTF.classifiedApiResponse>
     */
    search(query: string) {
        return this.backpacktf.__request(
            'get',
            `/classifieds/search/v1?` + query
        ) as Promise<BackpackTF.classifiedApiResponse>;
    }

    /**
     * Get an array of relevant listings for an item SKU
     * @returns Promise<BackpackTF.Classifieds.Snapshot>
     */
    getSnapshot(itemName: string) {
        return this.backpacktf.__request(
            'get',
            `classifieds/listings/snapshot?appid=440&sku=${encodeURIComponent(itemName)}`
        ) as Promise<BackpackTF.Classifieds.Snapshot>;
    }

    /**
     * Get account archived listings
     * @returns Promise<BackpackTF.Classifieds.GetListingsResponse>
     */
    getArchive(skip?: number, limit?: number) {
        return this.backpacktf.__request(
            'get',
            `/v2/classifieds/archive?skip=${skip || 0}&limit=${limit || 100}`
        ) as Promise<BackpackTF.Classifieds.GetListingsResponse>;
    }

    /**
     * Delete all archived listings
     * @param intent specify an intent to delete only sell/buy listings
     * @returns Promise<BackpackTF.Classifieds.DeleteArchiveResponse>
     */
    deleteArchive(intent?: 'buy' | 'sell') {
        return this.backpacktf.__request(
            'delete',
            '/v2/classifieds/archive',
            intent
                ? {
                      json: {
                          intent
                      }
                  }
                : null
        ) as Promise<BackpackTF.Classifieds.DeleteListingsResponse>;
    }

    /**
     * Get one archived listing
     * @returns Promise<BackpackTF.Listing>
     */
    getArchivedListing(listingID: string) {
        return this.backpacktf.__request(
            'get',
            `/v2/classifieds/archive/${listingID}`
        ) as Promise<BackpackTF.Classifieds.v2Listing>;
    }

    /**
     * Delete one archived listing
     * @returns Promise<void>
     */
    deleteArchivedListing(listingID: string) {
        return this.backpacktf.__request('delete', `/v2/classifieds/archive/${listingID}`) as Promise<void>;
    }

    /**
     * Update one archived listing
     * @returns Promise<unknown>
     */
    updateArchivedListing(listingID: string, data: Partial<BackpackTF.Classifieds.v2CreateBuyListing>) {
        return this.backpacktf.__request('patch', `/v2/classifieds/archive/${listingID}`, {
            json: data
        }) as Promise<unknown>;
    }

    /**
     * An Alias for updateArchivedListing
     * @returns Promise<unknown>
     */
    patchArchivedListing(listingID: string, data: Partial<BackpackTF.Classifieds.v2CreateBuyListing>) {
        return this.updateArchivedListing(listingID, data);
    }

    /**
     * Publish one archived listing to the active pool
     * @returns Promise<BackpackTF.Classifieds.v2Listing>
     */
    publishArchivedListing(listingID: string) {
        return this.backpacktf.__request(
            'post',
            `/v2/classifieds/archive/${listingID}/publish`
        ) as Promise<BackpackTF.Classifieds.v2Listing>;
    }

    /**
     * Get account listings
     * @returns Promise<BackpackTF.Classifieds.GetListingsResponse>
     */
    getListings(skip?: number, limit?: number) {
        return this.backpacktf.__request(
            'get',
            `/v2/classifieds/listings?skip=${skip || 0}&limit=${limit || 100}`
        ) as Promise<BackpackTF.Classifieds.GetListingsResponse>;
    }

    /**
     * Create one listing
     * @returns Promise<BackpackTF.Classifieds.v2Listing>
     */
    createListing(data: BackpackTF.Classifieds.v2CreateBuyListing | BackpackTF.Classifieds.v2CreateSellListing) {
        return this.backpacktf.__request('post', `/v2/classifieds/listings`, {
            json: data
        }) as Promise<BackpackTF.Classifieds.v2Listing>;
    }

    /**
     * Delete all listings
     * @param intent specify an intent to delete only sell/buy listings
     * @returns Promise<BackpackTF.Classifieds.Snapshot>
     */
    deleteListings(intent?: 'buy' | 'sell') {
        return this.backpacktf.__request(
            'delete',
            '/v2/classifieds/listings',
            intent
                ? {
                      json: {
                          intent
                      }
                  }
                : null
        ) as Promise<BackpackTF.Classifieds.DeleteListingsResponse>;
    }

    /**
     * Get batch operation limit
     * @returns Promise<BackpackTF.Classifieds.GetBatchResponse>
     */
    getBatch() {
        return this.backpacktf.__request(
            'get',
            '/v2/classifieds/listings/batch'
        ) as Promise<BackpackTF.Classifieds.GetBatchResponse>;
    }

    /**
     * Batch create listings
     * @returns Promise<BackpackTF.Classifieds.v2Listing[]>
     */
    createBatchListings(
        listings: (BackpackTF.Classifieds.v2CreateBuyListing | BackpackTF.Classifieds.v2CreateSellListing)[]
    ) {
        return this.backpacktf.__request('post', '/v2/classifieds/listings/batch', {
            json: listings
        }) as Promise<BackpackTF.Classifieds.v2Listing[]>;
    }

    /**
     * Get one listing
     */
    getListing(listingID: string) {
        return this.backpacktf.__request(
            'get',
            `/v2/classifieds/listings/${listingID}`
        ) as Promise<BackpackTF.Classifieds.v2Listing>;
    }

    /**
     * Delete one listing
     * @returns Promise<void>
     */
    deleteListing(listingID: string) {
        return this.backpacktf.__request('delete', `/v2/classifieds/listings/${listingID}`) as Promise<void>;
    }

    /**
     * Update one listing
     * @returns Promise<unknown>
     */
    updateListing(listingID: string, data: Partial<BackpackTF.Classifieds.v2CreateBuyListing>) {
        return this.backpacktf.__request('patch', `/v2/classifieds/listings/${listingID}`, {
            json: data
        }) as Promise<BackpackTF.Classifieds.v2Listing>;
    }

    /**
     * An Alias for updateListing
     * @returns Promise<unknown>
     */
    patchListing(listingID: string, data: Partial<BackpackTF.Classifieds.v2CreateBuyListing>) {
        return this.updateListing(listingID, data) as Promise<BackpackTF.Classifieds.v2Listing>;
    }

    /**
     * Move Listing to the archive
     * @returns Promise<BackpackTF.Classifieds.v2Listing>
     */
    archiveListing(listingID: string) {
        return this.backpacktf.__request(
            'post',
            `/v2/classifieds/listings/${listingID}/archive`
        ) as Promise<BackpackTF.Classifieds.v2Listing>;
    }

    /**
     * Promote this listing
     * @returns Promise<BackpackTF.Classifieds.v2Listing>
     */
    promoteListing(listingID: string) {
        return this.backpacktf.__request(
            'post',
            `/v2/classifieds/listings/${listingID}/promote`
        ) as Promise<BackpackTF.Classifieds.v2Listing>;
    }

    /**
     * Demote this listing
     * @returns Promise<BackpackTF.Classifieds.v2Listing>
     */
    demoteListing(listingID: string) {
        return this.backpacktf.__request(
            'post',
            `/v2/classifieds/listings/${listingID}/demote`
        ) as Promise<BackpackTF.Classifieds.v2Listing>;
    }
}
