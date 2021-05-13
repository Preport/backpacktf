import backpack from '..';

if (!(process.env.id && process.env.secret)) {
    console.error("Environment variables are not set")
    process.exit(1)
}
jest.setTimeout(20000)
var bp: backpack;
test('Initialize BackpackTF connection', async (done) => {
    bp = new backpack(process.env.id, process.env.secret);
    bp.on('ready', done);
})
var steamID: string;
test('Base Functions', async () => {
    const status = await bp.getStatus();
    expect(status.authMethod).toEqual('oauth')
    steamID = status.user.id;
})

test('Agent Functions', async () => {
    const pulse = await bp.Agent.pulse();
    expect(pulse).toMatchObject<backpack.Agent.PulseResponse>({
        status: 'active',
        client: 'got (https://github.com/sindresorhus/got)',
        current_time: pulse.current_time
    })
    const status = await bp.Agent.status();
    expect(status).toMatchObject<backpack.Agent.PulseResponse>({
        status: 'active',
        client: 'got (https://github.com/sindresorhus/got)',
        current_time: status.current_time
    });
    const stop = await bp.Agent.stop();
    expect(stop).toMatchObject<backpack.Agent.OnlyStatus>({
        status: 'inactive'
    })
    const status2 = await bp.Agent.status();
    expect(status2).toMatchObject<backpack.Agent.PulseResponse>({
        status: 'inactive',
    })
})

test('Alert Functions', async () => {
    const alert = await bp.Alerts.createAlert({
        currency: 'metal',
        intent: 'sell',
        item_name: 'test',
        min: 10,
        max: 20,
    })
    expect(alert).toMatchObject<typeof alert>({
        appid: 440,
        id: alert.id,
        intent: 'sell',
        item_name: 'test',
        price: {
            currency: 'metal',
            min: 10,
            max: 20
        },
        steamid: alert.steamid
    })
    await bp.Alerts.deleteAlert(alert.item_name, 'sell')

    //expect it to return 404
    try {
        throw (await bp.Alerts.getAlert(alert.id))
    } catch (err) {
        expect(err.message).toEqual('Object not found')
    }

    const resp = (await bp.Alerts.getAlerts()).results
    expect(resp).not.toContain<backpack.Alerts.Alert>({
        appid: 440,
        id: alert.id,
        intent: 'sell',
        item_name: 'test',
        steamid: steamID,
        price: {
            currency: 'metal',
            min: 10,
            max: 20
        }
    })
})

test('Notification Functions', async () => {

    const resp = await bp.Notifications.getNotifications()
    expect(resp).toHaveProperty('cursor.limit')

    if (resp.results.length) {
        const notification = await bp.Notifications.getNotification(resp.results[0].id);
        expect(notification).toHaveProperty('bundle');
    }

    expect(typeof await bp.Notifications.unreadNotifications()).toEqual('object');

    expect(await bp.Notifications.markNotifications()).toHaveProperty('modified')
})

test('Inventory Functions', async () => {
    expect(await bp.Inventory.getValue('76561198085810371')).toHaveProperty('value')
    expect(await bp.Inventory.getStatus('76561198085810371')).toHaveProperty('current_time')
    expect(await bp.Inventory.refresh('76561198085810371')).toHaveProperty('timestamp')
})

test('WebAPIUsers Functions', async () => {
    expect(await bp.WebApiUsers.getUsers(['76561198085810371', "76561198839402693"])).toHaveProperty('response.players.76561198085810371.success')
    expect(await bp.WebApiUsers.getImpersonatedUsers()).toHaveProperty('total')
})


