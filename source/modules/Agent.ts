import BackpackTF from '../index';

export default class Agent {
  private readonly backpacktf: BackpackTF;
  constructor(bp: BackpackTF) {
    this.backpacktf = bp;
  }
  /**
   * @returns Promise<Agent.PulseResponse>
   */
  pulse() {
    return this.backpacktf.__request('post', `/agent/pulse`) as Promise<BackpackTF.Agent.PulseResponse>;
  }

  /**
   * @returns Promise<Agent.OnlyStatus>
   */
  stop() {
    return this.backpacktf.__request('post', `/agent/stop`) as Promise<BackpackTF.Agent.OnlyStatus>;
  }
  /**
   * @returns Promise<Agent.PulseResponse>
   */
  status() {
    return this.backpacktf.__request('post', `/agent/status`) as Promise<BackpackTF.Agent.PulseResponse>;
  }
}
