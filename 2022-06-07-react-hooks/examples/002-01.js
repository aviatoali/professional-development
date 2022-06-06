function memoize(func) {
  return function (...args) {
    this.results = this.results || [];

    const previousResult = this.results.find((result) =>
      result.arguments.every((argument, index) => args[index] === argument)
    );

    if (previousResult) {
      return previousResult.result;
    }

    const result = func(...args);

    this.results.push({
      arguments: args,
      result,
    });

    return result;
  };
}

function add(x, y) {
  console.log('adding!');
  return x + y;
}

const memoizedAdd = memoize(add);

console.log('Non-memoized add');
console.log(add(2, 3));
console.log('First memoized add');
console.log(memoizedAdd(2, 3));
console.log('Subsequent memoized add');
console.log(memoizedAdd(2, 3));
console.log('Subsequent memoized add');
console.log(memoizedAdd(2, 3));
