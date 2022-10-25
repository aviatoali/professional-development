let ele = document.createElement('h3');
ele.innerHTML = 'Computations Complete: 0';
document.body.appendChild(ele);

/**
 * Note: this is here because I'm lazy and I don't wanna host the service worker file, so I'm fake hosting it :\ don't judge me
 * Could've also just been an inline code block if you just blob it, ex:
 * let blob = new Blob([
 *   `
 *      // here's my JS  
 *   `
 * ]);
 */
let workerJS = document.getElementById('workerJS').innerText;
let blob = new Blob([workerJS]);
let blobURL = window.URL.createObjectURL(blob);

const worker = new Worker(blobURL);

document.addEventListener('mousemove', function(event) {
    let cross = document.getElementsByClassName('x')[0];
    cross.style.left = String(event.clientX) + 'px';
    cross.style.top = String(event.clientY) + 'px';
    worker.postMessage('Compute');
});

worker.addEventListener('message', function(event) {
    ele.innerHTML = 'Computations Complete: ' + String(event.data);
});
