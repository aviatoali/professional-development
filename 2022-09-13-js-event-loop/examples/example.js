function start() {
  console.log(0);

  fetch('https://alexmorrise.com/sleep.php?t=10').then(function A() {
    console.log(1);
  });

  setTimeout(function B() {
    setTimeout(function C() {
      console.log(2);
    });
  });

  setTimeout(function D() {
    Promise.resolve().then(function E() {
      console.log(3);
    });
  });

  setTimeout(function F() {
    console.log(4);
  }, 1500);

  setTimeout(function G() {
    console.log(5);
  }, 1000);

  setTimeout(function H() {
    console.log(6);
  }, 4000);

  Promise.resolve().then(function K() {
    console.log(7);
  });

  setTimeout(function L() {
    console.log(8);
  }, 1);

  new Promise(function M(resolve) {
    console.log(9);
    delay(2);
    resolve();
  }).then(function N() {
    console.log(10);
  });

  setTimeout(function O() {
    console.log(11);
  }, 3000);

  setTimeout(function P() {
    console.log(12);
  }, 1);

  delay(2);
  console.log(13);
}

function delay(seconds) {
  const timestamp = new Date();
  while (new Date() - timestamp < seconds * 1000) {}
}
