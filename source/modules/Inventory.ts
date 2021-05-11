import BackpackTF from '../index'

class Inventory {
    backpacktf: BackpackTF
    constructor(bp: BackpackTF) {
        this.backpacktf = bp;
    }

    /**
    * @returns Promise<Inventory.Values>
    */
    getValue(steamid64: string) {
        return this.backpacktf.__request("get", `/inventory/${steamid64}/values`) as Promise<Inventory.Values>
    }

    /**
    * @returns Promise<Inventory.Status>
    */
    getStatus(steamid64: string) {
        return this.backpacktf.__request("get", `/inventory/${steamid64}/status`) as Promise<Inventory.Status>
    }

    /**
    * @returns Promise<Inventory.Status>
    */
    refresh(steamid64: string) {
        return this.backpacktf.__request("post", `/inventory/${steamid64}/refresh`) as Promise<Inventory.Status>
    }

}

namespace Inventory {
    export interface Values {
        market_value: number,
        value: number
    }
    export interface Status {
        current_time: number,
        last_update: number,
        timestamp: number,
        next_update: number,
        refresh_interval: number
    }
}
export = Inventory;