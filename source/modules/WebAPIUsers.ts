import BackpackTF from '../index';

export default class WebAPIUsers {
    private readonly backpacktf: BackpackTF;
    constructor(bp: BackpackTF) {
        this.backpacktf = bp;
    }
    /**
     * @param steamID64s Array of steamids
     * @returns Promise<WebAPIUsers.UserResponse>
     */
    getUsers(steamID64s: string[]) {
        return this.backpacktf.__request(
            'get',
            '/IGetUsers/v3?steamid=' + steamID64s.join(','),
            null,
            true
        ) as Promise<BackpackTF.WebAPIUsers.UserResponse>;
    }
    /**
     * @param skip An integer amount of users to skip.
     * @param limit An integer limit the amount of users returned. Default `100`
     * @returns Promise<WebAPIUsers.ImpersonatedResponse>
     */
    getImpersonatedUsers(skip?: number, limit?: number) {
        return this.backpacktf.__request(
            'get',
            `/IGetUsers/GetImpersonatedUsers?limit=${limit || 0}&skip=${skip || 0}`,
            null,
            true
        ) as Promise<BackpackTF.WebAPIUsers.ImpersonatedResponse>;
    }
}
