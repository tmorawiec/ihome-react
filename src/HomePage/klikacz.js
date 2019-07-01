import React from 'react'

class Klikacz extends React.Component {
  constructor() {
    super();
    this.state = {counter: 0};
  }

  render() {
    return (
      <div>
       <button onClick={this.increment.bind(this)}>+</button>
        <output>{this.state.counter}</output>
        <button>-</button>
      </div>
    );
  }



  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }


}




export default Klikacz