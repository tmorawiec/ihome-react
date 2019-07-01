import React from "react";

class Suwak extends React.Component {
  static defaultProps = {
    initialValue: 10,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { initialValue} = this.props;
    this.props.onSwitchChange(initialValue);
    
  }

  render() {
    const { value, initialValue } = this.props;

    return (
      <div>
        <input
          type="range"
          min="0"
          max="255"
          defaultValue={initialValue}
          value={value}
          onChange={this.handleChange}
          step="1"
        />

        <output>Dane wewnątrz komponentu: {value}</output>
      </div>
    );
  }

  handleChange(e) {
    this.props.onSwitchChange(e.target.value);

    this.props.socket.emit('switch', [this.props.name, e.target.value]);
    console.log(e.target.value)
    console.log(this.props.name)
  }
}
export default Suwak;


// import React from 'react'


// class Suwak extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
    
//   }

//   render() {
//     const value = this.props.value;
    
    
 
//     return (
//       <div>
       

//         <input 
//           id="typeinp" 
//           type="range" 
//           min="0" max="255" 
//           defaultValue="0"
//           value={value}
//           onChange={this.handleChange}
//           step="1"
//         />

//         <output>Inside: {value}</output>

//       </div>
//     );
//   }



//   handleChange(e) {
//     this.props.onSwitchChange(e.target.value);
//     this.props.socket.emit('suwak', e.target.value);
//     console.log(e.target.value)
//   }


// }
// export default Suwak


