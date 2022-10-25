let ele = document.createElement('h3');
ele.innerHTML = 'Computations Complete: 0';
document.body.appendChild(ele);

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
    cross.style.left = String(event.clientX) + 'px';
    cross.style.top = String(event.clientY) + 'px';
    pause(100);
    ele.innerHTML = 'Computations Complete: ' + String(counter);
});


// for touch screens 
document.addEventListener('touchmove', function(event) {
    let cross = document.getElementsByClassName('x')[0];
    cross.style.left = String(event.touches[0].clientX) + 'px';
    cross.style.top = String(event.touches[0].clientY) + 'px';
    pause(100);
    ele.innerHTML = 'Computations Complete: ' + String(counter);
});
