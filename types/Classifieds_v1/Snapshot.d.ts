import { Listing } from './Listing';

export interface Snapshot {
    listings?: Listing[];
    appid: 440;
    sku: string;
    createdAt: number;
}
