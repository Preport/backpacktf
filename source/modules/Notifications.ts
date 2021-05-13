import BackpackTF from '../index'

export default class Notifications {
    backpacktf: BackpackTF
    constructor(bp: BackpackTF) {
        this.backpacktf = bp;
    }
    /**
    * @param {string} id ID of the notification to get.
    * @returns Promise<BackpackTF.Notifications.Notification>
    */
    getNotification(id: string) {
        return this.backpacktf.__request("get", `/notifications/${id}`) as Promise<BackpackTF.Notifications.Notification>
    }
    /**
    * @param skip An integer amount of alerts to skip.
    * @param limit An integer limit the amount of alerts returned. Default `100`
    * @param unread Optional: Any non 0 number to get only unread Notifications.
    * @returns Promise<BackpackTF.Notifications.Response>
    */
    getNotifications(skip?: number, limit?: number, unread?: number) {
        return this.backpacktf.__request("get", `/notifications?skip=${skip || 0}&limit=${limit || 100}&unread=${unread || 0}`) as Promise<BackpackTF.Notifications.Response>
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
    * @returns Promise<BackpackTF.Notifications.Notification[]>
    */
    unreadNotifications() {
        return this.backpacktf.__request("post", `/notifications/unread`) as Promise<BackpackTF.Notifications.Notification[]>
    }
    /**
    * @returns Promise<BackpackTF.Notifications.MarkResponse>
    */
    markNotifications() {
        return this.backpacktf.__request("post", `/notifications/mark`) as Promise<BackpackTF.Notifications.MarkResponse>
    }
}