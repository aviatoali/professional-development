// polling server
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const activitiesController = require('./activitiesController');

const pollingPort = 3002;
const activitiesPath = '/api/activities';
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(
    cors({
        origin: function(origin, callback) {
            return callback(null, true);
        }
    })
);
app.use(bodyParser.json());

app.post(activitiesPath, activitiesController.postActivitiesHandler);
app.get(`${activitiesPath}/short`, activitiesController.getActivitiesShortPollHandler);
app.get(`${activitiesPath}/long`, activitiesController.getActivitiesLongPollHandler);

app.listen(pollingPort);

// websocket
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8082 });
wss.getUniqueId = () => Date.now().toString(); // milliseconds of now will be fine for our case

wss.on('connection', (ws) => {
    ws.id = wss.getUniqueId();
    activitiesController.wsActivitiesHandler(ws);
});