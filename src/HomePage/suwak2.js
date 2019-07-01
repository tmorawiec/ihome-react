import React from 'react'

class Suwak2 extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: 0
    // };
  }

  render() {
    const value = this.props.value;
    return (
      <div>
       

        <input 
          id="typeinp" 
          type="range" 
          min="0" max="255" 
          defaultValue={value}
          value={value}
          onChange={this.handleChange.bind(this)}
          step="1"
        />

        <output>{this.state.value}</output>

      </div>
    );
  }



  handleChange(e) {
    this.setState({value: e.target.value});
    // tu będzie wysyłanie danych przez socket.io
    this.props.socket.emit('suwak', e.target.value);
    console.log(e.target.value)
  }


}
export default Suwak2