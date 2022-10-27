let computationCountEl = document.createElement('h3');
computationCountEl.innerHTML = 'Computations Complete: 0';
document.body.appendChild(computationCountEl);

const worker = new Worker('http://localhost:3000/webWorker.js');

document.addEventListener('mousemove', function(event) {
    let cross = document.getElementsByClassName('x')[0];
    cross.style.left = `${event.clientX}px`;
    cross.style.top = `${event.clientY}px`;
    worker.postMessage('Compute');
});

worker.addEventListener('message', function(event) {
    computationCountEl.innerHTML = `Computations Complete: ${event.data}`;
});
