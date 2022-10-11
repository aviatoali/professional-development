import { useCallback, useState } from 'react';
import { ActivityApiPath, BASE_API_URL } from '../utils/constants';
import { useInterval } from '../utils/use-interval';

export const useActivitiesAPI = (apiPath: ActivityApiPath) => {
    const [activities, setActivities] = useState([]);
    const [fetchingActivities, setFetchingActivities] = useState(false);
    const [addingActivity, setAddingActivity] = useState(false);

    const fetchActivities = useCallback(async () => {
        if (fetchingActivities || !apiPath) {
            return;
        }
        setFetchingActivities(true);
        try {
            const response = await fetch(`${BASE_API_URL}${ActivityApiPath.Base}${apiPath}`);
            const activities = await response.json();
            setActivities(activities);
        } catch (error) {
            console.log('useActivities.fetchActivities error: ', error);
        }
        setFetchingActivities(false);
    }, [ fetchingActivities, apiPath])

    useInterval(fetchActivities, 10000); // Calls fetchActivities every 10s, feel free to play with the timer

    const addActivity = useCallback(async () => {
        if (addingActivity) {
            return;
        }
        setAddingActivity(true);
        try {
            await fetch(`${BASE_API_URL}${ActivityApiPath.Base}`, { method: 'POST' });
        } catch (error) {
            console.log('useActivities.apiRequest error: ', error);
        }
        setAddingActivity(false);
    }, [ addingActivity])

    return {
        activities,
        fetchingActivities,
        addingActivity,
        fetchActivities,
        addActivity
    };
};
