const path = require('path');
const fs = require('fs');
const EventEmitter = require('../event.js');

const eventEmitter = new EventEmitter();
const basePathToData = path.join(__dirname, '..', 'fixtures');
const activitiesFixtureFileName = 'activities.json';

const getJSONData = function (basePathToData, filename) {
    try {
        const fName = path.join(basePathToData, filename);
        return JSON.parse(fs.readFileSync(fName, 'utf-8'));
    } catch (error) {
        return [];
    }
};

const writeJSONData = (basePathToData, filename, data) => {
    const fName = path.join(basePathToData, filename);
    fs.writeFileSync(fName, JSON.stringify(data));
};

exports.postActivitiesHandler = (request, response) => {
    let data = getJSONData(basePathToData, activitiesFixtureFileName);
    let nextActivityId = '1';
    if (data?.length) {
        const prevActivity = data[data.length - 1];
        nextActivityId = `${parseInt(prevActivity.id) + 1}`;
    } else {
        data = [];
    }
    const newActivity = {
        id: nextActivityId,
        name: `Activity-${nextActivityId}`
    };
    data.push(newActivity);
    writeJSONData(basePathToData, activitiesFixtureFileName, data);
    eventEmitter.fire({ type: 'activityAdded', data: newActivity });
    setTimeout(() => response.send(data), 1000);
};

exports.getActivitiesShortPollHandler = (request, response) => {
    const data = getJSONData(basePathToData, activitiesFixtureFileName);
    setTimeout(() => response.send(data), 2000);
};

exports.getActivitiesLongPollHandler = (request, response, next) => {
    const id = Date.now().toString(); // milliseconds of now will be fine for our case
    const data = getJSONData(basePathToData, activitiesFixtureFileName);
    let timer = null;

    const handler = (event) => {
        clearTimeout(timer);
        response.status(201);
        response.end(JSON.stringify([...data, event.data]));
    };
 
    eventEmitter.register(id, handler);
    timer = setTimeout(function(){ 
        const wasUnregistered = eventEmitter.unregister(id);
        if (wasUnregistered){
            response.status(200);
            response.end(JSON.stringify([...data]));
        }
    }, 10000);
};

exports.wsActivitiesHandler = (wss, ws) => {
    // note: ws is the individual client connections
    const logPrefix = `Client ${ws.id}`;
    console.log(`${logPrefix} has connected`);

    // send initial activities
    ws.send(JSON.stringify(getJSONData(basePathToData, activitiesFixtureFileName)));

    // register event emitter handler
    const handler = (event) => {
        ws.send(JSON.stringify(getJSONData(basePathToData, activitiesFixtureFileName)));
    };
    eventEmitter.register(ws.id, handler, true);

    ws.onmessage = ({ data }) => {
        console.log(`${logPrefix} onmessage data: `, data);
    }

    ws.onclose = () => {
        console.log(`${logPrefix} has disconnected`);
        eventEmitter.unregister(ws.id);
    };
};
