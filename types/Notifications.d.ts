import { Listing } from './Classifieds_v1/Listing';

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
export interface NotificationResponse {
  results: Notification[];
  cursor: {
    skip: number;
    limit: number;
    total: number;
  };
}
export interface NotificationMarkResponse {
  modified: number;
}
