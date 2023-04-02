import { v2Listing } from './Listing';

export interface DeleteListingsResponse {
  deleted: number;
}
export interface GetBatchResponse {
  opLimit: number;
}
export interface GetListingsResponse {
  results?: v2Listing[];
  cursor: {
    skip: number;
    limit: number;
    total: number;
    _info: any;
  };
}
