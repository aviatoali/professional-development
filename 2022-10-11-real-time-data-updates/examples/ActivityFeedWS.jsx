import React, { useState, useEffect, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useActivitiesAPI } from './utils/use-activities-api';
import { ActivityApiPath } from './utils/constants';

const websocketUrl = 'ws://localhost:8082';

export const ActivityFeedWS = () => {
    const [wsUrl, setWSUrl] = useState(null);
    const [activities, setActivities] = useState([]);

    const { lastMessage, readyState } = useWebSocket(wsUrl);
    const { addingActivity, addActivity } = useActivitiesAPI(ActivityApiPath.LongPolling);     

    useEffect(() => {
        console.log('lastMessage: ', lastMessage?.data);
        // TODO: define what should happen once we get a message from the server

    }, [lastMessage]);

    const handleOpenWS = useCallback(() => {
        !wsUrl && setWSUrl(websocketUrl);
    }, [wsUrl]);

    const handleCloseWS = useCallback(() => {
        wsUrl && setWSUrl(null);
    }, [wsUrl]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <>
            <span>The WebSocket is currently {connectionStatus}</span>
            <div>Activities:</div>
            <ul>
                {activities?.map(({ id, name }) => (
                    <li key={id}>
                        {name}
                    </li>
                ))}
            </ul>
            <button disable={addingActivity ? 1 : 0} onClick={addActivity}>{addingActivity ? 'Adding...' : 'Add Activity'}</button>
            {readyState === ReadyState.OPEN ? (
                <button onClick={handleCloseWS}>Close WebSocket</button>
            ) : (
                <button onClick={handleOpenWS}>Open WebSocket</button>
            )}
        </>
    );
}
