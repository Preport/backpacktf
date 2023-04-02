export namespace Alerts {
  export interface Response {
    results: Alert[];
    cursor: {
      skip: number;
      limit: number;
      total: number;
    };
  }

  export interface Alert {
    id: string;
    item_name: string;
    intent: 'sell' | 'buy';
    appid: number;
    steamid: string;
    price: {
      currency: 'metal' | 'key';
      min: number;
      max: number;
    };
    message?: string;
  }
  export interface Create {
    item_name: string;
    intent: 'sell' | 'buy';
    currency?: 'metal' | 'key';
    min?: number;
    max?: number;
    blanket?: number;
  }
}
