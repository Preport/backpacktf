export * from './Classifieds_v1';
export * from './Classifieds_v2';
export * from './Agent';
export * from './Alerts';
export * from './Inventory';
export * from './Notifications';
export * from './WebAPIUsers';

export interface StatusResponse {
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
    [key in StatusResponse['authMethod']]: {
      desription: string;
    };
  };
}
