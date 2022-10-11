
export const BASE_API_URL = 'http://localhost:3002/api';

export enum ActivityApiPath {
    Base = '/activities',
    ShortPolling = '/short',
    LongPolling = '/long',
    WebSocket = '/ws'
}
