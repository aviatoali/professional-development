# React Hooks — React Basics

## What is React?

At its essence, React is a library that allows you to render DOM elements into a container. It does this by using component functions that return JSX, which is used to generate DOM elements. The JSX that is returned can be component based on passed-in properties or local component state.

## What is a React application?

A React application is simply a React component and all of its children. Unlike frameworks like Ember, React does not require control over the entire page. All that is required is that a React component be rendered into a specific element in the DOM:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <div>Hello, world!</div>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

(In React 18, this looks slightly different, as a "root" needs to be created.)

But that's it! You could theoretically render any number of "applications" on the page as you wanted, as long as they were rendered into different DOM elements.

## What is a React component?

React has two types of components:

1. Class components
2. Functional components

Before hooks, functional components were also called "stateless components" because there was no way for function components to have state. If you wanted state, you had to use a [class component](./examples/001-01.jsx).

There's a lot of overhead to learning classes. So hooks were introduced into the [functional components](./examples/001-02.jsx).

These hooks replace the lifecycle hooks (which is why they're called "hooks").

## What is JSX?

Before your code ends up in the browser, it gets transpiled into something the browser can understand (and JSX is something it does not understand). React isn't the only library that uses JSX, but when you're using it in a React application, your JSX gets compiled into `React.createElement` invokations.

```javascript
<button type="button">Hello!</button>
```

becomes

```javascript
React.createElement('button', { type: 'button' }, 'Hello!');
```

(Note: this is why you're required to have `import React from 'react';` at the top of every file that has React in it—otherwise, `React.createElement` will throw an error because `React` is not defined. In later versions of React, the bundler/transpiler can do that automatically and the import is no longer required.)

The first parameter is the name of the element or component. The second is the element or component's properties.

The third parameter (and any subsequent parameters) are the children.

Children can be static, as we have seen, or dynamic:

```javascript
function Header({ children }) {
  return <h1>{children}</h1>;
}
```

[Example with JSX](./examples/001-03.jsx)

[Example without JSX](./examples/001-04.jsx)

When a React component renders, it calls the `render` function (which in the case of functional components is the component itself), and uses `React.createElement` to generate a JSON object (known as the Virtual DOM) that represents the DOM elements that need to be displayed:

```json
{
  "type": "button",
  "props": {
    "type": "button",
    "children": "Hello!"
  }
}
```

React then does something called "reconciliation" where it determines if the DOM elements (or even the components themselves) already exist and use the existing elements and components so they are not destroyed and recreated from scratch. This is going to be important later!

## What is a Fragment?

Knowing what we now know about `React.createElement`, what's the problem with this?

```javascript
function List() {
  return (
    <h1>List</h1>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  );
}
```

The transpiler is going to panic because it expects there to be a top-level element when it parses the JSX. But `List` doesn't have one, it has *two*. So you could solve this by wrapping the `<h1>` and `<ul>` in a `<div>`, but that adds an unnecessary element to your DOM.

So we can use Fragments instead:

```javascript
function List() {
  return (
    <React.Fragment>
      <h1>List</h1>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </React.Fragment>
  );
}
```

or even better, the Fragment shorthand:

```javascript
function List() {
  return (
    <>
      <h1>List</h1>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </>
  );
}
```

Next: [Memory](./002-memory.md).