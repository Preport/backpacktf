import BackpackTF from '../index';

export default class Alerts {
    private readonly backpacktf: BackpackTF;
    constructor(bp: BackpackTF) {
        this.backpacktf = bp;
    }
    /**
     * @param {string} id ID of the alert to get.
     * @returns Promise<Alerts.Alert>
     */
    getAlert(id: string) {
        return this.backpacktf.__request('get', `/classifieds/alerts/${id}`) as Promise<BackpackTF.Alerts.Alert>;
    }

    /**
     * @param item Name of the item we are trying to delete.
     * @param intent Either "buy" or "sell".
     * @returns Promise<void>
     */
    deleteAlert(item: string, intent: 'buy' | 'sell') {
        // const query = []
        // if (intent) {
        // query.push(item ? "item_name=" + item : '');
        // query.push(intent ? "intent=" + intent : '');
        // item = '?' + query.join('&')
        // } else item = '/' + item;
        return this.backpacktf.__request(
            'delete',
            `/classifieds/alerts?item_name=${item}&intent=${intent}`
        ) as Promise<void>;
    }
    /**
     * @param skip An integer amount of alerts to skip.
     * @param limit An integer limit the amount of alerts returned. Default `500`
     * @returns Promise<Alerts.AlertResponse>
     */
    getAlerts(skip?: number, limit?: number) {
        return this.backpacktf.__request(
            'get',
            `/classifieds/alerts?skip=${skip || 0}&limit=${limit || 500}`
        ) as Promise<BackpackTF.Alerts.Response>;
    }

    /**
     * @param alert Alert to create.
     * @returns Promise<Alerts.Alert>
     */
    createAlert(alert: BackpackTF.Alerts.Create) {
        return this.backpacktf.__request(
            'post',
            `/classifieds/alerts?${Object.keys(alert)
                .map(prop => prop + '=' + alert[prop])
                .join('&')}`
        ) as Promise<BackpackTF.Alerts.Alert>;
    }
}
