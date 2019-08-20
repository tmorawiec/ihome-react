import React from "react";
import './Suwak.css';

class Suwak extends React.Component {
  static defaultProps = {
    // initialValue: 10,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // const { initialValue} = this.props;
    // this.props.onSwitchChange(initialValue);
    
  }

  render() {
    const { value, initialValue } = this.props;

    return (
      <div>
        <input
        class="slider"
          type="range"
          min="0"
          max="255"
          // defaultValue={initialValue}
          value={value}
          onChange={this.handleChange}
          step="1"
        />

        <output>Suwak: {this.props.name + this.precent(value)}</output>
      </div>
    );
  }

  precent = (val) => `${((val/255)*100).toFixed()}%`

  handleChange(e) {
    this.props.onSwitchChange(e.target.value);

    this.props.socket.emit('switch', [this.props.name, e.target.value]);
    console.log(e.target.value)
    // console.log(filter="url(#blur)")
  }
}
export default Suwak;
