let computationCountEl = document.createElement('h3');
computationCountEl.innerHTML = 'Computations Complete: 0';
document.body.appendChild(computationCountEl);

let counter = 0;

function pause(ms) {
    let time = new Date();
    counter += 1;
    while ((new Date()) - time <= ms) {
        // waiting ...
    } 
}

document.addEventListener('mousemove', function(event) {
    let cross = document.getElementsByClassName('x')[0];
    cross.style.left = `${event.clientX}px`;
    cross.style.top = `${event.clientY}px`;
    pause(100);
    computationCountEl.innerHTML = `Computations Complete: ${counter}`;
});
