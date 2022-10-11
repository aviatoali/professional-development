// Fake event emitter, allows the add activity endpoint to inform any registered
// listeners that a new activity has been added
class EventEmitter {
    // a map of all currently registered listeners where key = passed in id from the register method
    // and val = { persist, callback }. persist is a boolean denoting whether the listener should delete itself
    // after an event and callback is the method that should fire when an event is fired
    listeners = {}; 

    /**
     * Adds a listener to the listener map
     * @param {string | number} id
     * @param {(event) => void} listener - method you want invoked when an event fires
     * @param {boolean} persist - if true then keep listener in map until manually unregistered, else delete listener after first event
     */
    register(id, listener, persist = false) {
        this.listeners[id] = { persist, callback: listener };
    }
    
    unregister(id) {
        return delete this.listeners[id];
    }

    /**
     * Fire an event, causing the execution of all listeners in listener map
     * @param {{ type: string, data: any }} event 
     */
    fire(event) {
        // loop through all listeners in map and call their registered callbacks
        for (let k in this.listeners) {
            let listener = this.listeners[k];
            !listener.persist && this.unregister(k); // if listener isn't a persistent one, unregister it
            listener.callback(event);
        }
    }
}

module.exports = EventEmitter;
