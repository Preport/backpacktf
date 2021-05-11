import backpack from '..';

if (!(process.env.id && process.env.secret)) {
    console.error("Environment variables are not set")
    process.exit(1)
}

var bp: backpack;
test('Initialize BackpackTF connection', async (done) => {
    bp = new backpack(process.env.id, process.env.secret);
    bp.on('ready', done);
})

test('Base Functions', async () => {
    expect(await bp.getStatus()).toHaveProperty('user.id');
})

test('Agent Functions', async () => {
    expect(await bp.Agent.pulse()).toHaveProperty('expire_at')
    expect((await bp.Agent.status()).status).toEqual('active');
    expect((await bp.Agent.stop()).status).toEqual('inactive');
    expect((await bp.Agent.status()).status).toEqual('inactive');
})

test('Alert Functions', async () => {
    expect(await bp.Alerts.getAlerts()).toHaveProperty('cursor.total');
    //Missing 3 fns Will be added after deleteAlert starts working
})

test('Notification Functions', async () => {
    expect(await bp.Notifications.getNotifications()).toHaveProperty('cursor.total');
    //Missing 4 fns Will be added after deleteNotification starts working
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


