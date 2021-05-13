import BackpackTF from '../index'

export default class Alerts {
    backpacktf: BackpackTF
    constructor(bp: BackpackTF) {
        this.backpacktf = bp;
    }
    /**
    * @param {string} id ID of the alert to get.
    * @returns Promise<Alerts.Alert>
    */
    getAlert(id: string) {
        return this.backpacktf.__request("get", `/classifieds/alerts?${id}`) as Promise<BackpackTF.Alerts.Alert>
    }
    /**
    * @deprecated End-point currently does not work.
    * @param item ID of the alert to delete.
    * @returns Promise<Unknown>
    *//**
    * @deprecated End-point currently does not work.
    * @param item Name of the item we are trying to delete.
    * @param intent Either "buy" or "sell".
    * @returns Promise<Unknown>
    */
    deleteAlert(item: string, intent?: "buy" | "sell") {
        const query = []
        if (intent) {
            query.push(item ? "item_name=" + item : '');
            query.push(intent ? "intent=" + intent : '');
            item = query.join('&')
        }
        return this.backpacktf.__request("delete", `/classifieds/alerts?${item}`) as Promise<any>
    }
    /**
    * @param skip An integer amount of alerts to skip.
    * @param limit An integer limit the amount of alerts returned. Default `500`
    * @returns Promise<Alerts.AlertResponse>
    */
    getAlerts(skip?: number, limit?: number) {
        return this.backpacktf.__request("get", `/classifieds/alerts?skip=${skip || 0}&limit=${limit || 500}`) as Promise<BackpackTF.Alerts.Response>
    }

    /**
    * @param alert Alert to create.
    * @returns Promise<{}>
    */
    createAlert(alert: BackpackTF.Alerts.Create) {
        return this.backpacktf.__request("post", `/classifieds/alerts?${Object.keys(alert).map(prop => prop + '=' + alert[prop]).join('&')}`) as Promise<{}>;
    }
}