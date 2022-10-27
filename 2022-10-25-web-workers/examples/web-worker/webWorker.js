let counter = 0;
const pause = function (ms) {
    let time = new Date();
    counter += 1;
    while ((new Date()) - time <= ms) {
        // waiting ...
    }
}

this.addEventListener('message', function(event) {
    if (event.data === 'Compute') {
        pause(100);
        this.postMessage(counter);
    }
});