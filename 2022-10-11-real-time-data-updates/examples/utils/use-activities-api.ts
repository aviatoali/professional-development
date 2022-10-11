import { useCallback, useState } from 'react';
import { ActivityApiPath, BASE_API_URL } from './constants';
import { useInterval } from './use-interval';

export const useActivitiesAPI = (apiPath: ActivityApiPath) => {
    const [activities, setActivities] = useState([]);
    const [fetchingActivities, setFetchingActivities] = useState(false);
    const [addingActivity, setAddingActivity] = useState(false);

    const fetchActivities = useCallback(async () => {
        // TODO (1): Implement fetch activities. It should:
        // 1. not fetch if we're already fetching activities, or if no apiPath was passed into this hook
        // 2. toggle the fetchingActivities state boolean to true before it fires the api request
        // 3. fire the fetch request (use BASE_API_URL cons and ActivityApiPath enum to construct the url, along with apiPath)
        // 4. set activities state array based on request response
        // 5. toggle the fetchingActivities state boolean to false no matter what the outcome for the request is

    }, [fetchingActivities, apiPath])

    useInterval(fetchActivities, 10000);

    const addActivity = useCallback(async () => {
        // TODO (2): Implement add activity. Doesn't need to carry a body, will just be a direct POST call. It should:
        // 1. not fire add request if we're already adding an activity
        // 2. toggle the addingActivity state boolean to true before it fires the api request
        // 3. fire the fetch request (use BASE_API_URL cons and ActivityApiPath enum to construct the url)
        // 4. toggle the request state boolean to false no matter what the outcome for the request is

    }, [addingActivity])

    return {
        activities,
        fetchingActivities,
        addingActivity,
        fetchActivities,
        addActivity
    };
};
