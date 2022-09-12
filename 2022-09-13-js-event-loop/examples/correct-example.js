function start() {
  console.log(0);

  fetch('https://alexmorrise.com/sleep.php?t=7').then(function A() {
    console.log(13);
  });

  setTimeout(function B() {
    setTimeout(function C() {
      console.log(11);
    });
  });

  setTimeout(function D() {
    Promise.resolve().then(function E() {
      console.log(5);
    });
  });

  setTimeout(function F() {
    console.log(8);
  }, 1500);

  setTimeout(function G() {
    console.log(7);
  }, 1000);

  setTimeout(function H() {
    console.log(10);
  }, 4000);

  Promise.resolve().then(function K() {
    console.log(3);
  });

  setTimeout(function L() {
    console.log(6);
  }, 1);

  new Promise(function M(resolve) {
    console.log(1);
    delay(2);
    resolve();
  }).then(function N() {
    console.log(4);
  });

  setTimeout(function O() {
    console.log(12);
  }, 3000);

  setTimeout(function P() {
    console.log(9);
  }, 1);

  delay(2);
  console.log(2);
}

function delay(seconds) {
  const timestamp = new Date();
  while (new Date() - timestamp < seconds * 1000) {}
}
