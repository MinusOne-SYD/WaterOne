import './App.css';
import * as React from 'react';
import axios from 'axios';

function App() {
  const [address, setAddress] = React.useState('1600 Pennsylvania Ave NW')
  const [lake, setLake] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [lakeType, setLakeType] = React.useState('rainfall');
  const [lakeQuality, setLakeQuality] = React.useState('high');

  const waterType = [
    {value: 'rainfall', text: 'Rainfall'},
    {value: 'damp', text: 'Damp'},
    {value: 'lake', text: 'Lake'},
  ]

  const waterQuality = [
    {value: 'high', text: 'High'},
    {value: 'medium', text: 'Medium'},
    {value: 'low', text: 'Low'},
  ]

  const getDistance = (x1, y1, x2, y2) => {
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
  }

  const handleAddressChange = event => {
    setAddress(event.target.value);
  }

  const handleLakeType = event => {
    setLakeType(event.target.value);
  }

  const handleLakeQuality = event => {
    setLakeQuality(event.target.value);
  }

  const fetchFromJSON = async () => {
    await fetch('water.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => {
      response.json().then(data => {
        var mappedData = data.map(source => source.metadata);
        fetchFromAPI(mappedData);
      })
    })
  }

  const fetchFromAPI = async (mappedData) => {
    const axios = require('axios');
    const params = {
      access_key: "77378826c171b536786c6938af54ae60",
      query: address
    }

    await axios.get('http://api.positionstack.com/v1/forward', {params})
    .then(response => {
      var data = response.data.data;
      var distance = 20000000000;
      var reserve_name = "";
      var reserve_country = "";

      for (var i = 0; i < mappedData.length; i++) {
      var dist_calc = getDistance(mappedData[i]['latitude'], mappedData[i]['longitude'],
        data[0].latitude, data[0].longitude)
          if (dist_calc < distance && mappedData[i]['type'] == lakeType && mappedData[i]['quality'] == lakeQuality) {
              distance = dist_calc;
              reserve_name = mappedData[i].lake_name;
              reserve_country = mappedData[i].country;
          }
          else {
            reserve_name = 'Not found';
            reserve_country = data[0].country;
          }
      }

      setLake(reserve_name);
      setCountry(reserve_country);
    })
    .catch(error => {
      console.log(error);
    });
  }

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
              <label htmlFor="address">Address</label>
              <input type="text" id="address" onChange={handleAddressChange}></input>
            </div>
            <div className="form-body">
            <label htmlFor="laketype">Type</label>
              <select id="laketype" value={lakeType} onChange={handleLakeType}>
                {waterType.map(waterOptions => (
                  <option key={waterOptions.value} value={waterOptions.value}>
                    {waterOptions.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-body">
            <label htmlFor="lakequality">Quality</label>
              <select id="lakequality" value={lakeQuality} onChange={handleLakeQuality}>
                {waterQuality.map(qualityOptions => (
                  <option key={qualityOptions.value} value={qualityOptions.value}>
                    {qualityOptions.text}
                  </option>
                ))}
              </select>
            </div>
          </form>
        <button onClick={fetchFromJSON}>LOCATE</button>
        <span>Nearest Lake: {lake}</span>
        <span>Country: {country}</span>
        </div>
      </div>
    </div>
  );
}

export default App;