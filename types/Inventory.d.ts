export namespace Inventory {
  export interface Values {
    market_value: number;
    value: number;
  }
  export interface Status {
    current_time: number;
    last_update: number;
    timestamp: number;
    next_update: number;
    refresh_interval: number;
  }
}
