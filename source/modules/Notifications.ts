import { Notification, NotificationMarkResponse, NotificationResponse } from '../../types';
import BackpackTF from '../index';
export default class Notifications {
  private readonly backpacktf: BackpackTF;
  constructor(bp: BackpackTF) {
    this.backpacktf = bp;
  }
  /**
   * @param {string} id ID of the notification to get.
   * @returns Promise<Notification>
   */
  getNotification(id: string) {
    return this.backpacktf.__request('get', `/notifications/${id}`) as Promise<Notification>;
  }
  /**
   * @param skip An integer amount of alerts to skip.
   * @param limit An integer limit the amount of alerts returned. Default `100`
   * @param unread Optional: Any non 0 number to get only unread Notifications.
   * @returns Promise<NotificationMarkResponse>
   */
  getNotifications(skip?: number, limit?: number, unread?: number) {
    return this.backpacktf.__request(
      'get',
      `/notifications?skip=${skip || 0}&limit=${limit || 100}&unread=${unread || 0}`
    ) as Promise<NotificationResponse>;
  }
  /**
   * @deprecated End-point currently does not work.
   * @param {string} id ID of the notification to delete.
   * @returns Promise<Unknown>
   */
  deleteNotification(id: string) {
    return this.backpacktf.__request('delete', `/notifications/${id}`) as Promise<any>;
  }

  /**
   * @returns Promise<Notification[]>
   */
  unreadNotifications() {
    return this.backpacktf.__request('post', `/notifications/unread`) as Promise<Notification[]>;
  }
  /**
   * @returns Promise<NotificationMarkResponse>
   */
  markNotifications() {
    return this.backpacktf.__request('post', `/notifications/mark`) as Promise<NotificationMarkResponse>;
  }
}
