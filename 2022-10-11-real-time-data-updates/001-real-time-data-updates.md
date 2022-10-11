# Real Time Data Updates

## Our Standard Flow

* The client makes a request for data and waits
* The server calculates a response
* The server sends the response to the client
* The client updates itself according to the response data

Great for initial load displaying some static data, terrible for real time data updates. Imagine if you had to pull down to reload your chat window in your phone for every new message.

## How do we get that hot fresh and juicy data?

Plenty of ways but here's some popular approaches:

1. [Short Polling](002-short-polling.md)
2. [Long Polling](003-long-polling.md)
3. [WebSockets](004-websockets.md)
4. [Server Side Events](005-server-side-events.md)
