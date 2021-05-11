import BackpackTF from '../index'

class Notifications {
    backpacktf: BackpackTF
    constructor(bp: BackpackTF) {
        this.backpacktf = bp;
    }
    /**
    * @param {string} id ID of the notification to get.
    * @returns Promise<Notifications.Notification>
    */
    getNotification(id: string) {
        return this.backpacktf.__request("get", `/notifications/${id}`) as Promise<Notifications.Notification>
    }
    /**
    * @param skip An integer amount of alerts to skip.
    * @param limit An integer limit the amount of alerts returned. Default `100`
    * @param unread Optional: Any non 0 number to get only unread Notifications.
    * @returns Promise<Notifications.Response>
    */
    getNotifications(skip?: number, limit?: number, unread?: number) {
        return this.backpacktf.__request("get", `/notifications?skip=${skip || 0}&limit=${limit || 100}&unread=${unread || 0}`) as Promise<Notifications.Response>
    }
    /**
    * @deprecated End-point currently does not work.
    * @param {string} id ID of the notification to delete.
    * @returns Promise<Unknown>
    */
    deleteNotification(id: string) {
        return this.backpacktf.__request("delete", `/notifications/${id}`) as Promise<any>
    }

    /**
    * @returns Promise<Notifications.Notification[]>
    */
    unreadNotifications() {
        return this.backpacktf.__request("post", `/notifications/unread`) as Promise<Notifications.Notification[]>
    }
    /**
    * @returns Promise<Notifications.MarkResponse>
    */
    markNotifications() {
        return this.backpacktf.__request("post", `/notifications/mark`) as Promise<Notifications.MarkResponse>
    }
}

namespace Notifications {
    export interface Notification {
        id: string,
        steamid: string,
        lastMoved: number,
        elementId: string,
        userId: string,
        type: number,
        bunde: {
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

export = Notifications;