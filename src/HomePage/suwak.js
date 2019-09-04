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


      <div class="row">
        <div class="col-sm-2">
         {!this.props.permission && <span class="badge badge-warning">Brak dostępu</span>}
         <span class="badge badge-dark">{this.props.name}</span>
         <span class="badge badge-secondary">{this.precent(value)}</span>


          
        </div>
        <div class="col-sm-10">
          <input
            class="slider"
            type="range"
            min="0"
            max="255"
            disabled={!this.props.permission}
            value={value}
            onChange={this.handleChange}
            step="1"
          />
        </div>
      </div>






      </div>
    );
  }

  // 255 is 100%
  precent = (val) => `${((val/255)*100).toFixed()}%`

  handleChange(e) {
    this.props.onSwitchChange(e.target.value);
    this.props.socket.emit('switch', [this.props.name, e.target.value]);
    console.log(`Sending data: ${[this.props.name, e.target.value]}`)
  }
}
export default Suwak;
