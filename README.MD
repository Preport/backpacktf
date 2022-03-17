# BACKPACKTF

A wrapper for https://www.backpack.tf OAuth API.

Create an app if you don't have one already: https://backpack.tf/developer/apps.

Breaking changes may occur Until v1

### Constructor

```ts
import backpacktf from 'backpacktf-oauth';
//or
const backpacktf = require('backpacktf-oauth');

const bp = new backpacktf('***client_id***', '***client_secret***');

bp.once('ready', () => {
    //You can use the module however you want now
});
```

#### Method

```ts
// Checks current users status. Returns BackpackTF.StatusResponse
bp.getStatus();
```

⚠️ All Methods Return their shown values wrapped by a `Promise`. ⚠️

## Classes

### Classifieds

I'm too lazy to type them here just use typecript

### Agent

#### Methods

```ts
// Activates User Agent returns Agent.PulseResponse
await bp.Agent.pulse();

// Stops User Agent returns Agent.OnlyStatus (Probably "inactive")
await bp.Agent.stop();

// Checks current User Agent status returns Agent.PulseResponse
await bp.Agent.status();
```

#### Types

```ts
namespace Agent {
    export interface PulseResponse extends OnlyStatus {
        current_time?: number;
        expire_at?: number;
        client?: string;
    }
    export interface OnlyStatus {
        status: 'active' | 'inactive';
    }
}
```

### Alerts

#### Methods

```ts
    // Get an alert by alertid (string) returns Alerts.Alert
    await bp.Alerts.getAlert(id)

    // This endpoint currently doesn't work due to serverside issues.
    // Delete an alert by alertid(string) returns UNKNOWN
    await bp.Alerts.deleteAlert(id)

    // Get alerts returns Alerts.Response.
    // skip and limit variables are Optional.
    await bp.Alerts.getAlerts(skip?, limit?)

    // Create an Alert by alert (Alerts.Create)  returns Alerts.Alert
    await bp.Alerts.createAlert(alert)
```

#### Types

```ts
namespace Alerts {
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
    }
    export interface Create {
        item_name: string;
        intent: 'sell' | 'buy';
        currency: 'metal' | 'key';
        min: number;
        max: number;
        blanket: string;
    }
}
```

### Notifications

#### Methods

```ts
    // Get a notification by notificationid (string) returns Notifications.Notification
    await bp.Notifications.getNotification(id)

    // This endpoint currently doesn't work due to serverside issues.
    // Delete a notification by notificationid (string) returns UNKNOWN
    await bp.Notifications.deleteNotification(id)

    // Get notifications returns Notifications.Response.
    // skip, limit and unread variables are Optional.
    await bp.Notifications.getNotifications(skip?, limit?, unread?)

    // Unread all notifications returns Notifications.Notification[] (returns all unread Notifications and marks them as read)
    await bp.Notifications.unreadNotifications(alert)

    // Mark Notifications returns Notifications.MarkResponse
    await bp.Notifications.markNotifications(alert)
```

#### Types

```ts
namespace Notifications {
    export interface Notification {
        id: string;
        steamid: string;
        lastMoved: number;
        elementId: string;
        userId: string;
        type: number;
        bunde: {
            listing?: BackpackTF.classifiedItemBuy | BackpackTF.classifiedItemSell;
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
```

### WebAPIUsers

#### Methods

```ts
    // Gets UserInfos by steamids (string[]) returns WebAPIUsers.UserResponse
    await bp.WebApiUsers.getUsers(steamids)

    // Gets Impersonated users returns WebAPIUsers.ImpersonatedResponse
    // skip and limit variables are Optional.
    await bp.WebApiUsers.getImpersonatedUsers(skip?, limit?)
```

#### Types

```ts
namespace WebAPIUsers {
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
```

### Inventory

#### Methods

```ts
// Gets inventory value of a user by steamid (string) returns Inventory.Values
await bp.Inventory.getValue(steamid);

// Gets status of a user by steamid (string) returns Inventory.Status
await bp.Inventory.getStatus();

// Refreshes Status of a user by steamid (string) returns Inventory.Status
await bp.Inventory.refresh();
```

#### Types

```ts
namespace Inventory {
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
```
