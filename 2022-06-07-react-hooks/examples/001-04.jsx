import React from 'react';

export function App() {
  return React.createElement(Message, { message: 'Message' });
}

function Message({ message }) {
  return React.createElement('div', null, `The message is: "${message}"`);
}
