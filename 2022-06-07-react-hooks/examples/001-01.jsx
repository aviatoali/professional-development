import { Component } from 'react';

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.increment = this.increment.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.counter !== prevState.counter) {
      console.log('incremented!');
    }
  }

  increment() {
    this.setState({
      counter: Math.min(this.state.counter + 1, this.props.max),
    });
  }

  render() {
    const { counter } = this.state;

    return (
      <div>
        {counter}
        <button type="button" onClick={this.increment}>
          +
        </button>
      </div>
    );
  }
}
