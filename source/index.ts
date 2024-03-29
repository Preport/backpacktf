import got, { OptionsOfUnknownResponseBody } from 'got';

import { EventEmitter } from 'events';
import oauth, { AccessToken } from 'simple-oauth2';
import Alerts from './modules/Alerts';
import Agent from './modules/Agent';
import Notifications from './modules/Notifications';
import Inventory from './modules/Inventory';
import WebAPIUsers from './modules/WebAPIUsers';
import Classifieds from './modules/Classifieds';
import { StatusResponse } from '../types';

const backpack = 'https://backpack.tf/api/oauth';

export default class BackpackTF extends EventEmitter {
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
    return this.__request('get', '/') as Promise<StatusResponse>;
  }
  async __request(
    type: 'post' | 'get' | 'delete' | 'patch',
    uri: string,
    options?: OptionsOfUnknownResponseBody,
    legacy?: boolean
  ): Promise<any> {
    const token = legacy || (await this.fetchToken())?.token.access_token;
    return new Promise<ReturnType<typeof got.get>>(
      (resolve: (any: any) => void, reject: ({ status, message }: { status: number; message: string }) => void) => {
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
