import { Listing } from './Classifieds_v1/Listing';

export namespace Notifications {
    export interface Notification {
        id: string;
        steamid: string;
        lastMoved: number;
        elementId: string;
        userId: string;
        type: number;
        bundle: {
            listing?: Listing;
        };
        contents: {
            subject: string;
            message: string;
            url: string;
        };
    }
    export interface Response {
        results: Notification[];
        cursor: {
            skip: number;
            limit: number;
            total: number;
        };
    }
    export interface MarkResponse {
        modified: number;
    }
}
