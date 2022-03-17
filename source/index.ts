import got, { Got, OptionsOfUnknownResponseBody } from 'got';

import { EventEmitter } from 'events';
import oauth, { AccessToken } from 'simple-oauth2';
const backpack = 'https://backpack.tf/api/oauth';

class BackpackTF extends EventEmitter {
    private token: AccessToken;
    private client: oauth.ClientCredentials;

    Alerts: Alerts;
    Notifications: Notifications;
    Agent: Agent;
    Inventory: Inventory;
    WebApiUsers: WebAPIUsers;
    Classifieds: Classifieds;

    constructor(client_id: string, client_secret: string) {
        super();

        this.Alerts = new Alerts(this);
        this.Notifications = new Notifications(this);
        this.Agent = new Agent(this);
        this.Inventory = new Inventory(this);
        this.WebApiUsers = new WebAPIUsers(this);
        this.Classifieds = new Classifieds(this);

        this.client = new oauth.ClientCredentials({
            client: {
                id: client_id,
                secret: client_secret
            },
            auth: {
                tokenHost: 'https://backpack.tf/',
                tokenPath: 'https://backpack.tf/oauth/access_token'
            },
            options: {
                authorizationMethod: 'body'
            }
        });
        this.init(true);
    }
    private async init(emit?: boolean) {
        this.token = await this.client.getToken({ scope: 'read write' }, { json: true });
        if (emit) this.emit('ready');
    }

    private async fetchToken(force?: boolean) {
        if (this.token.expired(10) || force) {
            try {
                this.token = await this.token.refresh({ scope: 'read write' });
            } catch {
                await this.init();
            }
        }
        return this.token;
    }

    getStatus() {
        return this.__request('get', '/') as Promise<BackpackTF.statusResponse>;
    }
    async __request(
        type: 'post' | 'get' | 'delete' | 'patch',
        uri: string,
        options?: OptionsOfUnknownResponseBody,
        legacy?: boolean
    ): Promise<any> {
        const token = legacy || (await this.fetchToken())?.token.access_token;
        return new Promise<ReturnType<typeof got.get>>(
            (resolve: (any: any) => void, reject: ({ status: number, message: string }) => void) => {
                got[type](
                    (legacy ? 'http://backpack.tf/api' : backpack) + uri,
                    Object.assign(
                        {
                            headers: {
                                authorization: 'Bearer ' + token
                            }
                        },
                        options || {}
                    )
                )
                    .catch(err => {
                        reject(err);
                    })
                    .then(resp => {
                        try {
                            resolve(JSON.parse((resp as any).body));
                        } catch {
                            //@ts-expect-error
                            resolve();
                        }
                    });
            }
        );
    }
}
import Alerts from './modules/Alerts';
import Agent from './modules/Agent';
import Notifications from './modules/Notifications';
import Inventory from './modules/Inventory';
import WebAPIUsers from './modules/WebAPIUsers';
import Classifieds from './modules/Classifieds';

namespace BackpackTF {
    export interface error {
        message: string;
    }
    export interface statusResponse {
        user: {
            id: string;
            name: string;
            avatar: string;
            class: string;
            style: string;
            premium: boolean;
            online: boolean;
        };
        authMethod: 'token' | 'oauth' | 'session';
        description: [string];
        authMethods: {
            [key in 'token' | 'oauth' | 'session']: {
                desription: string;
            };
        };
    }
    export type classifiedApiResponse = {
        buy: {
            fold: boolean;
            listings: {
                appid: 440;
                automatic: 1 | 0;
                bump: number;
                buyout: 1 | 0;
                created: number;
                currencies: {
                    metal?: number;
                    keys?: number;
                };
                details: string;
                id: string;
                item: classifiedItemBuy;
                intent: 0;
                offers: 0 | 1;
                steamid: string;
            }[];
            total: number;
        };
        sell: {
            fold: boolean;
            listings: {
                appid: 440;
                automatic: 1 | 0;
                bump: number;
                buyout: 1 | 0;
                created: number;
                currencies: {
                    metal?: number;
                    keys?: number;
                };
                details: string;
                id: string;
                item: classifiedItemSell;
                intent: 1;
                offers: 0 | 1;
                steamid: string;
            }[];
            total: number;
        };
        page_size: number;
        skip: number;
        total: number;
        message?: string;
    };
    export type attribute = {
        defindex: number;
        value?: number;
        float_value: number;
        is_output?: boolean;
        quantity?: number;
        quality?: number;
        itemdef?: number;
        attributes?: {
            defindex: number;
            value?: number;
            float_value: number;
        };
    };
    export type classifiedItemBuy = {
        defindex: number;
        name: string;
        quality: number;
        attributes?: attribute[];
    };
    export type classifiedItemSell = classifiedItemBuy & {
        id: number;
        original_id: number;
        level: number;
        inventory: number;
        quantity: number;
        origin: number;
        style?: number;
    };

    export type Listing = {
        id: string;
        steamid: string;
        item: classifiedItemBuy | classifiedItemSell;
        appid: number;
        currencies: {
            metal?: number;
            keys?: number;
        };
        offers: 0 | 1;
        buyout: 0 | 1;
        details: string;
        created: number;
        bump: number;
        intent: 'buy' | 'sell';
        automatic: 0 | 1;
    };

    export namespace Agent {
        export interface PulseResponse extends OnlyStatus {
            current_time?: number;
            expire_at?: number;
            client?: string;
        }
        export interface OnlyStatus {
            status: 'active' | 'inactive';
        }
    }

    export namespace Classifieds {
        export type v2Listing = {
            id: string;
            steamid: string;
            appid: number;
            currencies: { metal?: number; keys?: number };
            value: {
                raw: number;
                short: string;
                long: string;
            };
            tradeOffersPreferred: boolean;
            buyoutOnly: boolean;
            listedAt: number;
            bumpedAt: number;
            intent: string;
            item: v2Item;
            count: number;
            promoted?: boolean;
            status: string;
            userAgent?: {
                client: string;
                lastPulse: number;
            };
            user?: {
                id: string;
                name: string;
                avatar: string;
                avatarFull: string;
                premium: boolean;
                online: boolean;
                banned: boolean;
                customNameStyle: string;
                acceptedSuggestions: number;
                class: string;
                style: string;
                tradeOfferUrl: string;
                isMarketPlaceSeller: string;
                flagImpersonated: any;
                bans: any[];
            };
        };

        export type v2Item = {
            appid: number;
            australium: boolean;
            baseName: string;
            class?: string[];
            craftable: boolean;
            crateSeries?: number;
            defindex: number;
            festivized: boolean;
            id: string;
            imageUrl: string;
            killstreak?: {
                tier: number;
                killstreaker: string;
                sheen: string;
            };
            level?: number;
            marketName: string;
            name: string;
            origin?: {
                id: number;
                name: string;
            };
            originalId: string;
            priceindex: string;
            price: {
                steam: {
                    currency: string;
                    short: string;
                    long: string;
                    raw: number;
                    value: number;
                };
                community: {
                    metadata: {
                        appid: number;
                        quality: number;
                        defindexes: number[];
                        item_name: string;
                        base_item_name: string;
                        priceindex: string;
                        tradable: boolean;
                        craftable: boolean;
                        value_raw: number;
                        item_slot: string;
                        release_data: number;
                    };
                    value: number;
                    valueHigh: number;
                    currency: string;
                    raw: number;
                    short: string;
                    long: string;
                    updatedAt: number;
                    difference: number;
                };
                suggested: {
                    raw: number;
                    short: string;
                    long: string;
                };
            };
            quality: {
                id: number;
                name: string;
                color: string;
            };
            quantity: number;
            recipe?: {
                inputItems: string[];
                outputItem: string;
                targetItem: {
                    itemName: string;
                    imageUrl: string;
                    _source: {
                        _id: string;
                        name: string;
                        defindex: number;
                        item_class: string;
                        item_type_name: string;
                        item_name: string;
                        item_description: string;
                        proper_name: boolean;
                        item_slot: string;
                        item_quality: number;
                        image_inventory: string;
                        min_ilevel: number;
                        max_ilevel: number;
                        image_url: string;
                        image_url_large: string;
                        item_set: string;
                        craft_class: string;
                        craft_material_type: string;
                        capabilities: {
                            nameable: boolean;
                            can_gift_wrap: boolean;
                            can_craft_count: boolean;
                            can_craft_mark: boolean;
                            can_be_restored: boolean;
                            strange_parts: boolean;
                            can_card_upgrade: boolean;
                            can_strangify: boolean;
                            can_killstreakify: boolean;
                            can_consume: boolean;
                        };
                        used_by_classes: string[];
                        attributes: attribute[];
                        first_sale_date: number;
                        release_date: number;
                        appid: number;
                        _keywords: string[];
                    };
                };
            };
            slot: string;
            tradable: boolean;
            summary: {
                value: string;
            };
            _source: {
                defindex: number;
                quality: number;
                quantity: string;
                attributes: attribute[];
            };
        };

        export interface v2CreateBuyListing {
            item: v2BuyItem;
            details: string;
            currencies: {
                metal: number;
                keys: number;
            };
        }
        export interface v2CreateSellListing {
            id: string;
            details: string;
            currencies: {
                metal: number;
                keys: number;
            };
        }
        export interface v2BuyItem {
            baseName: string;
            quality: { id: number };
            australium?: boolean;
            craftable?: boolean;
            crateSeries?: number;
            tradable?: boolean;
            festivized?: boolean;
            killstreak?: {
                tier: number;
                killstreaker: string;
                sheen: string;
            };
            quantity?: number;
            rarity?: { id: number };
            paint?: { id: number };
            particle?: { id: number };
            elevatedQuality?: { id: number };
        }
        export interface Snapshot {
            listings?: Listing[];
            appid: 440;
            sku: string;
            createdAt: number;
        }
        export interface DeleteListingsResponse {
            deleted: number;
        }
        export interface GetBatchResponse {
            opLimit: number;
        }
        export interface GetListingsResponse {
            results?: v2Listing[];
            cursor: {
                skip: number;
                limit: number;
                total: number;
                _info: any;
            };
        }
    }

    export namespace Alerts {
        export interface Response {
            results: Alert[];
            cursor: {
                skip: number;
                limit: number;
                total: number;
            };
        }

        export interface Alert {
            id: string;
            item_name: string;
            intent: 'sell' | 'buy';
            appid: number;
            steamid: string;
            price: {
                currency: 'metal' | 'key';
                min: number;
                max: number;
            };
            message?: string;
        }
        export interface Create {
            item_name: string;
            intent: 'sell' | 'buy';
            currency?: 'metal' | 'key';
            min?: number;
            max?: number;
            blanket?: number;
        }
    }

    export namespace Inventory {
        export interface Values {
            market_value: number;
            value: number;
        }
        export interface Status {
            current_time: number;
            last_update: number;
            timestamp: number;
            next_update: number;
            refresh_interval: number;
        }
    }

    export namespace Notifications {
        export interface Notification {
            id: string;
            steamid: string;
            lastMoved: number;
            elementId: string;
            userId: string;
            type: number;
            bundle: {
                listing?: Listing;
            };
            contents: {
                subject: string;
                message: string;
                url: string;
            };
        }
        export interface Response {
            results: Notification[];
            cursor: {
                skip: number;
                limit: number;
                total: number;
            };
        }
        export interface MarkResponse {
            modified: number;
        }
    }

    export namespace WebAPIUsers {
        export interface UserResponse {
            response: {
                success: 1 | 0;
                current_time: number;
                players: {
                    [steamid64: string]: {
                        steamid: string;
                        success: 1 | 0;
                        backpack_value: {
                            [appid: string]: number;
                        };
                        backpack_update: {
                            [appid: string]: number;
                        };
                        name: string;
                        backpack_tf_trust: {
                            for: number;
                            against: number;
                        };
                    };
                };
            };
        }
        export interface ImpersonatedResponse {
            results: {
                steamid: string;
                personaname: string;
                avatar: string;
            }[];
            total: number;
        }
    }
}
export = BackpackTF;
