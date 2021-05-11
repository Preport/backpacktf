import got, { Headers, Options } from 'got';
import { Response } from 'got/dist/source/core';
import { EventEmitter } from 'events'
import oauth, { AccessToken } from 'simple-oauth2'

const backpack = "http://backpack.tf/api/oauth"

class BackpackTF extends EventEmitter {
    private token: AccessToken
    private client: oauth.ClientCredentials;

    Alerts: Alerts
    Notifications: Notifications
    Agent: Agent
    Inventory: Inventory
    WebApiUsers: WebAPIUsers

    constructor(client_id: string, client_secret: string) {
        super()

        this.Alerts = new Alerts(this)
        this.Notifications = new Notifications(this)
        this.Agent = new Agent(this)
        this.Inventory = new Inventory(this)
        this.WebApiUsers = new WebAPIUsers(this)

        this.client = new oauth.ClientCredentials({
            client: {
                id: client_id,
                secret: client_secret
            },
            auth: {
                tokenHost: "http://backpack.tf/",
                tokenPath: "http://backpack.tf/oauth/access_token"
            },
            options: {
                authorizationMethod: 'body',
            }
        })
        this.init(true);
    };
    private async init(emit?: boolean) {
        this.token = await this.client.getToken({ scope: "read write" }, { json: true });
        if (emit) this.emit('ready');
    }

    private async fetchToken(force?: boolean) {
        if (this.token.expired(10) || force) {
            try {
                this.token = await this.token.refresh({ scope: "read write" })
            } catch {
                await this.init();
            }
        };
        return this.token
    }

    getStatus() {
        return this.__request('get', '/') as Promise<BackpackTF.StatusResponse>;
    }
    async __request(type: "post" | "get" | "delete", uri: string, options?: Options, legacy?: boolean) {
        const token = legacy || (await this.fetchToken())?.token.access_token
        return JSON.parse((await (got[type]((legacy ? "http://backpack.tf/api" : backpack) + uri, Object.assign({
            headers: {
                authorization: "Bearer " + token
            },
        }, options || {})) as Promise<Response<any>>)).body)
    }
}
import Alerts from './modules/Alerts'
import Agent from './modules/Agent'
import Notifications from './modules/Notifications'
import Inventory from './modules/Inventory'
import WebAPIUsers from './modules/WebAPIUsers';

namespace BackpackTF {
    export type classifiedApiResponse = {
        buy: {
            fold: boolean,
            listings: {
                appid: 440,
                automatic: 1 | 0,
                bump: number,
                buyout: 1 | 0,
                created: number,
                currencies: {
                    metal?: number,
                    keys?: number
                },
                details: string,
                id: string,
                item: classifiedItemBuy,
                intent: 0,
                offers: 0 | 1,
                steamid: string
            }[],
            total: number
        },
        sell: {
            fold: boolean,
            listings: {
                appid: 440,
                automatic: 1 | 0,
                bump: number,
                buyout: 1 | 0,
                created: number,
                currencies: {
                    metal?: number,
                    keys?: number
                },
                details: string,
                id: string,
                item: classifiedItemSell,
                intent: 1,
                offers: 0 | 1,
                steamid: string
            }[],
            total: number
        },
        page_size: number,
        skip: number,
        total: number
    }

    export type classifiedItemBuy = {
        defindex: number,
        name: string,
        quality: number,
        attributes: {
            defindex: number,
            value?: number,
            float_value: number
        }[]
    }

    export type classifiedItemSell = classifiedItemBuy & {
        id: number,
        inventory: number,
        level: number,
        origin: number,
        original_id: number,
        quantity: number
    }

    export interface StatusResponse {
        user: {
            id: string,
            name: string,
            avatar: string,
            class: string,
            style: string,
            premium: boolean,
            online: boolean
        },
        authMethod: string,
        description: string[],
        authMethods: {
            [key in "token" | "session" | "oauth"]: {
                description: string
            }
        }
    }
}
export = BackpackTF