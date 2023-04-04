import { AgentPulseResponse, OnlyStatus } from '../../types';
import BackpackTF from '../index';

export default class Agent {
  private readonly backpacktf: BackpackTF;
  constructor(bp: BackpackTF) {
    this.backpacktf = bp;
  }
  /**
   * @returns Promise<AgentPulseResponse>
   */
  pulse() {
    return this.backpacktf.__request('post', `/agent/pulse`) as Promise<AgentPulseResponse>;
  }

  /**
   * @returns Promise<OnlyStatus>
   */
  stop() {
    return this.backpacktf.__request('post', `/agent/stop`) as Promise<OnlyStatus>;
  }
  /**
   * @returns Promise<AgentPulseResponse>
   */
  status() {
    return this.backpacktf.__request('post', `/agent/status`) as Promise<AgentPulseResponse>;
  }
}
