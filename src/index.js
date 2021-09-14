import React from 'react';
import ReactDOM from 'react-dom';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

function toFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onTemperatureChange(event.target.value);
  }

  render() {
    const scale = this.props.scale;
    const temperature = this.props.temperature;

    return (
      <fieldset>
        <legend>Input temperature in {scaleNames[scale]}</legend>
        <input 
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    );
  };
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would be boiling.</p>;
  } else {
    return <p>The water would not be boiling.</p>
  }
}

class Calculater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: 37, scale: 'c'};

    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput 
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput 
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculater />,
  document.getElementById('root')
);