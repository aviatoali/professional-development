const path = require('path');
const fs = require('fs');
const EventEmitter = require('./event.js');

const eventEmitter = new EventEmitter(); // dummy event system to broadcast add activity event to all listeners
const basePathToData = path.join(__dirname, 'fixtures');
const activitiesFixtureFileName = 'activities.json'; // this is serving as our DB. A JSON to which all activities are written to and read from

// helper to pull activities from activities JSON
const getJSONData = function (basePathToData, filename) {
    try {
        const fName = path.join(basePathToData, filename);
        return JSON.parse(fs.readFileSync(fName, 'utf-8'));
    } catch (error) {
        return [];
    }
};

// helper to write updates to activities JSON
const writeJSONData = (basePathToData, filename, data) => {
    const fName = path.join(basePathToData, filename);
    fs.writeFileSync(fName, JSON.stringify(data));
};

// handler for add activity
exports.postActivitiesHandler = (request, response) => {
    // read activity data from activities JSON (simulating our table we're querying)
    let data = getJSONData(basePathToData, activitiesFixtureFileName);

    // create a new activity
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

    // write updated activities array to activities JSON
    writeJSONData(basePathToData, activitiesFixtureFileName, data);
    // tell the event emitter to broadcast that an activity was added to all its registered listeners
    eventEmitter.fire({ type: 'activityAdded', data: newActivity });
    setTimeout(() => response.send(data), 1000); // just here to act as a processing delay from server
};

// handler for short polling get activities request
exports.getActivitiesShortPollHandler = (request, response) => {
    // read activity data from activities JSON (simulating our table we're querying)
    const data = getJSONData(basePathToData, activitiesFixtureFileName);
    // respond to request with the read data after a 1500 delay
    setTimeout(() => response.send(data), 1500);
};

// handler for long polling get activities request
exports.getActivitiesLongPollHandler = (request, response, next) => {
    // create an id for this long polling request connection
    const id = Date.now().toString(); // milliseconds of now will be fine for our case
    
    // read activity data from activities JSON (simulating our table we're querying)
    const data = getJSONData(basePathToData, activitiesFixtureFileName);
    
    // this is our max timeout for maintaining this long polling connection. If we get no updates by the time we hit this, we return whatever activities we have
    let timer = null; 

    // this is the handler we're going to pass our eventEmitter to call when an activity is added
    const handler = (event) => {
        // TODO (1): clear the current timeout for this request

        // TODO (2): construct a response with the current activities and new activities, and end the connection.
        //     Response object reference: https://expressjs.com/en/api.html#res
        //     Note: to determine how to get the new activity from the response either log event in this handler or reference
        //     the postActivitiesHandler above to see how it's firing the event when an activity is added

    };

    // TODO (3): register your handler to the eventEmitter by the id you generated at the top of this method.
    //     so that when an activity gets added your handler gets called


    // Max timeout block that gets hit if no update events are received during polling interval
    timer = setTimeout(function(){ 
        // TODO (4): define behavior on timeout. If no add activity events are receieved by the time you hit the max
        //     timeout of this service, the service should unregister itself from events from the eventEmitter by
        //     its id, then return a response containing the current activities
    }, 10000);
};

// handler for websocket connection. Note: ws is the individual client connection
// websocket api ref for available methods/events: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
exports.wsActivitiesHandler = (ws) => {
    const logPrefix = `Client ${ws.id}`; // just for logging purposes
    console.log(`${logPrefix} has connected`);

    // TODO (1): When you first connect to the server, you should send back a list of the current activities


    // TODO (2): Define what we should do when an activity is added and the eventEmitter calls this handler
    const handler = (event) => {

    };

    // TODO (3): register your event handler to the eventEmitter using ws.id. Remember to the eventEmitter registration
    // the extra boolean param to signal that this is a persistent connection, otherwise the eventEmitter will
    // remove your listener from its listeners map after the first event is fired.


    // This fires when the client sends a message to the server
    ws.onmessage = ({ data }) => {
        console.log(`${logPrefix} onmessage data: `, data);
    }

    // This fires when the client disconnects from the server
    ws.onclose = () => {
        console.log(`${logPrefix} has disconnected`);
        eventEmitter.unregister(ws.id);
    };
};
