import BackpackTF from '../index'

class WebAPIUsers {
    backpacktf: BackpackTF
    constructor(bp: BackpackTF) {
        this.backpacktf = bp;
    }
    /**
     * @param steamID64s Array of steamids
     * @returns Promise<WebAPIUsers.UserResponse>
     */
    getUsers(steamID64s: string[]) {
        return this.backpacktf.__request('get', "/IGetUsers/v3?steamid=" + steamID64s.join(','), null, true) as Promise<WebAPIUsers.UserResponse>;
    }
    /**
    * @param skip An integer amount of users to skip.
    * @param limit An integer limit the amount of users returned. Default `100`
    * @returns Promise<WebAPIUsers.ImpersonatedResponse>
    */
    getImpersonatedUsers(skip?: number, limit?: number) {
        return this.backpacktf.__request('get', `/IGetUsers/GetImpersonatedUsers?limit=${limit || 0}&skip=${skip || 0}`, null, true) as Promise<WebAPIUsers.ImpersonatedResponse>;
    }
}

namespace WebAPIUsers {
    export interface UserResponse {
        response: {
            success: 1 | 0,
            current_time: number,
            players: {
                [steamid64: string]: {
                    steamid: string,
                    success: 1 | 0,
                    backpack_value: {
                        [appid: string]: number
                    },
                    backpack_update: {
                        [appid: string]: number
                    },
                    name: string,
                    backpack_tf_trust: {
                        for: number,
                        against: number
                    }
                }
            }
        }
    }
    export interface ImpersonatedResponse {
        results: {
            steamid: string,
            personaname: string,
            avatar: string
        }[],
        total: number
    }
}
export = WebAPIUsers;