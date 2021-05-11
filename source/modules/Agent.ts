import BackpackTF from '../index'

class Agent {
    backpacktf: BackpackTF
    constructor(bp: BackpackTF) {
        this.backpacktf = bp;
    }
    /**
    * @returns Promise<Agent.PulseResponse>
    */
    pulse() {
        return this.backpacktf.__request("post", `/agent/pulse`) as Promise<Agent.PulseResponse>
    }

    /**
    * @returns Promise<Agent.OnlyStatus>
    */
    stop() {
        return this.backpacktf.__request("post", `/agent/stop`) as Promise<Agent.OnlyStatus>
    }
    /**
    * @returns Promise<Agent.PulseResponse>
    */
    status() {
        return this.backpacktf.__request("post", `/agent/status`) as Promise<Agent.PulseResponse>
    }
}

namespace Agent {
    export interface PulseResponse extends OnlyStatus {
        current_time?: number,
        expire_at?: number,
        client?: string
    }
    export interface OnlyStatus {
        status: "active" | "inactive"
    }
}
export = Agent;