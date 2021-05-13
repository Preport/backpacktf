import got, { Headers, Options } from 'got';
import { Response } from 'got/dist/source/core';
import { EventEmitter } from 'events'
import oauth, { AccessToken } from 'simple-oauth2'
const backpack = "https://backpack.tf/api/oauth"

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
                tokenHost: "https://backpack.tf/",
                tokenPath: "https://backpack.tf/oauth/access_token"
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
        return this.__request('get', '/') as Promise<BackpackTF.statusResponse>;
    }
    async __request(type: "post" | "get" | "delete", uri: string, options?: Options, legacy?: boolean): Promise<any> {
        const token = legacy || (await this.fetchToken())?.token.access_token
        return new Promise((resolve: (any: any) => void, reject: ({ message: string }) => void) => {

            (got[type]((legacy ? "http://backpack.tf/api" : backpack) + uri, Object.assign({
                headers: {
                    authorization: "Bearer " + token
                },
            }, options || {})) as Promise<Response<any>>)
                .catch(err => {
                    try {
                        reject(JSON.parse(err.response.body))
                    } catch {
                        reject({ message: "Malformed response" });
                    }
                })
                .then(resp => {
                    try {
                        //@ts-expect-error
                        resolve(JSON.parse(resp.body))
                    } catch {
                        //@ts-expect-error
                        resolve();
                    }
                })

        })

    }
}
import Alerts from './modules/Alerts'
import Agent from './modules/Agent'
import Notifications from './modules/Notifications'
import Inventory from './modules/Inventory'
import WebAPIUsers from './modules/WebAPIUsers';

namespace BackpackTF {
    export interface error {
        message: string
    }
    export interface statusResponse {
        user: {
            id: string,
            name: string,
            avatar: string,
            class: string,
            style: string,
            premium: boolean,
            online: boolean
        },
        authMethod: 'token' | 'oauth' | 'session',
        description: [string],
        authMethods: {
            [key in 'token' | 'oauth' | 'session']: {
                desription: string
            }
        }
    }
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

    export namespace Agent {
        export interface PulseResponse extends OnlyStatus {
            current_time?: number,
            expire_at?: number,
            client?: string
        }
        export interface OnlyStatus {
            status: "active" | "inactive"
        }
    }

    export namespace Alerts {
        export interface Response {
            results: Alert[],
            cursor: {
                skip: number,
                limit: number,
                total: number
            }
        }

        export interface Alert {
            id: string,
            item_name: string,
            intent: "sell" | "buy",
            appid: number,
            steamid: string,
            price: {
                currency: "metal" | "key",
                min: number,
                max: number
            },
            message?: string
        }
        export interface Create {
            item_name: string,
            intent: "sell" | "buy",
            currency: "metal" | "key",
            min: number,
            max: number,
            blanket?: string
        }
    }

    export namespace Inventory {
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

    export namespace Notifications {
        export interface Notification {
            id: string,
            steamid: string,
            lastMoved: number,
            elementId: string,
            userId: string,
            type: number,
            bundle: {
                listing?: BackpackTF.classifiedItemBuy | BackpackTF.classifiedItemSell
            }
            contents: {
                subject: string,
                message: string
                url: string
            }
        }
        export interface Response {
            results: Notification[],
            cursor: {
                skip: number,
                limit: number,
                total: number
            }
        }
        export interface MarkResponse {
            modified: number
        }
    }

    export namespace WebAPIUsers {
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
}
export = BackpackTF