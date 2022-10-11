import React from 'react';
import { useActivitiesAPI } from './utils/use-activities-api';
import { ActivityApiPath } from './utils/constants';

export const ActivityFeedPolling = () => {
    const {
        activities,
        fetchingActivities,
        addingActivity,
        addActivity
    } = useActivitiesAPI(ActivityApiPath.ShortPolling); 

    return (
        <>
            <div>{`Activities: ${fetchingActivities ? 'fetching...' : ''}`}</div>
            {fetchingActivities && !activities.length ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {activities.map(({ id, name }) => (
                        <li key={id}>
                            {name}
                        </li>
                    ))}
                </ul>
            )}
            <button disable={addingActivity ? 1 : 0} onClick={addActivity}>{addingActivity ? 'Adding...' : 'Add Activity'}</button>
        </>
  );
}
