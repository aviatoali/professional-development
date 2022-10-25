let computationCountEl = document.createElement('h3');
computationCountEl.innerHTML = 'Computations Complete: 0';
document.body.appendChild(computationCountEl);

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
    cross.style.left = `${event.clientX}px`;
    cross.style.top = `${event.clientY}px`;
    worker.postMessage('Compute');
});

worker.addEventListener('message', function(event) {
    console.log('@@@@@ counter FE: ', event.data);
    computationCountEl.innerHTML = `Computations Complete: ${event.data}`;
});
