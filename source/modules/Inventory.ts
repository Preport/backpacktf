import { InventoryStatus, InventoryValues } from '../../types';
import BackpackTF from '../index';

export default class Inventory {
  private readonly backpacktf: BackpackTF;
  constructor(bp: BackpackTF) {
    this.backpacktf = bp;
  }

  /**
   * @returns Promise<InventoryValues>
   */
  getValue(steamid64: string) {
    return this.backpacktf.__request('get', `/inventory/${steamid64}/values`) as Promise<InventoryValues>;
  }

  /**
   * @returns Promise<InventoryStatus>
   */
  getStatus(steamid64: string) {
    return this.backpacktf.__request('get', `/inventory/${steamid64}/status`) as Promise<InventoryStatus>;
  }

  /**
   * @returns Promise<InventoryStatus>
   */
  refresh(steamid64: string) {
    return this.backpacktf.__request('post', `/inventory/${steamid64}/refresh`) as Promise<InventoryStatus>;
  }
}
