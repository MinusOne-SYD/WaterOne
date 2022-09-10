import './App.css';
import * as React from 'react';

function App() {

  const stateOptions = [
    {value: 'NSW', text: 'New South Wales'},
    {value: 'NT', text: 'Northern Territory'},
    {value: 'ACT', text: 'Australian Capital Territory'},
    {value: 'TAS', text: 'Tasmania'},
    {value: 'VIC', text: 'Victoria'},
    {value: 'WA', text: 'Western Australia'},
    {value: 'SA', text: 'South Australia'},
    {value: 'QLD', text: 'Queensland'},
  ]

  const typeOptions = [
    {value: 'A', text: 'A'},
    {value: 'B', text: 'B'},
    {value: 'C', text: 'C'}
  ]

  const [state, setState] = React.useState(stateOptions[0].value);
  const [type, setType] = React.useState(typeOptions[0].value);

  const handleStateChange = event => {
    setState(event.target.value);
  };

  const handleTypeChange = event => {
    setType(event.target.value);
  };

  return (
    <div className="app">
      <div className="app-bg" />
      <div className="app-content">
        <div className="header">
          <header className="title">
            WaterOne
          </header>
          <div className="subtitle">
            Ⓒ 2022 MinusOne
          </div>
        </div>
        <div className="body">
          <span>Search for water sources near your business.</span>
          <form>
            <div className="form-body">
              <label for="states">State</label>
              <select id="states" value={state} onChange={handleStateChange}>
                {stateOptions.map(stateOptions => (
                  <option>
                    {stateOptions.text}
                  </option>
                ))}
              </select>
              </div>
              <div className="form-body">
                <label for="suburb">Suburb</label>
                <input type="text" id="suburb"></input>
              </div>
              <div className="form-body">
                <label for="postcode">Postcode</label>
                <input type="text" id="postcode"></input>
              </div>
              {/* <div className="form-body">
              <label for="types">Type</label>
              <select id="types" value={type} onChange={handleTypeChange}>
                {typeOptions.map(typeOptions => (
                  <option>
                    {typeOptions.text}
                  </option>
                ))}
              </select>
            </div> */}
          </form>
        <button>LOCATE</button>
        </div>
      </div>
    </div>
  );
}

export default App;