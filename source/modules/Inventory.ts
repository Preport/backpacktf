import BackpackTF from '../index';

export default class Inventory {
  private readonly backpacktf: BackpackTF;
  constructor(bp: BackpackTF) {
    this.backpacktf = bp;
  }

  /**
   * @returns Promise<Inventory.Values>
   */
  getValue(steamid64: string) {
    return this.backpacktf.__request('get', `/inventory/${steamid64}/values`) as Promise<BackpackTF.Inventory.Values>;
  }

  /**
   * @returns Promise<Inventory.Status>
   */
  getStatus(steamid64: string) {
    return this.backpacktf.__request('get', `/inventory/${steamid64}/status`) as Promise<BackpackTF.Inventory.Status>;
  }

  /**
   * @returns Promise<Inventory.Status>
   */
  refresh(steamid64: string) {
    return this.backpacktf.__request('post', `/inventory/${steamid64}/refresh`) as Promise<BackpackTF.Inventory.Status>;
  }
}
