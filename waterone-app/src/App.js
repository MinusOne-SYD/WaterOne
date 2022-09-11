import './App.css';
import * as React from 'react';
import axios from 'axios';

function App() {
  const [address, setAddress] = React.useState('1600 Pennsylvania Ave NW')
  const [result, setResult] = React.useState([]);
  const [lake, setLake] = React.useState('');
  const [country, setCountry] = React.useState('');

  const [force, setForce] = React.useState(true);

  const getDistance = (x1, y1, x2, y2) => {
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
  }

  const handleAddressChange = event => {
    setAddress(event.target.value);
  }

  const handleForce = () => {
    setForce(!force)
  }

  const fetchFromJSON = async () => {
    console.log("Called Fetch");
    await fetch('water.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => {
      console.log(response)
      response.json().then(data => {
        // console.log("Processed JSON", data)
        var mappedData = data.map(source => source.metadata);

        /*for(var i=0; i < data.length; i++) {
          // console.log(res.data[i].metadata)
          temparr.push(res.data[i].metadata)
        }
        // console.log(temparr[0].country)*/
        setResult(mappedData);
        fetchFromAPI(mappedData);
      })
    })
  }

  const fetchFromAPI = async (mappedData) => {
    const axios = require('axios');
    const params = {
      access_key: "77378826c171b536786c6938af54ae60",
      // query: '1600 Pennsylvania Ave NW'
      query: address
    }

    await axios.get('http://api.positionstack.com/v1/forward', {params})
    .then(response => {
      console.log(response)
      var data = response.data.data;
      console.log(data)
      // for(var i = 0; i < response.data['data'].length ; i++) {
      //   // console.log(response.data.data[i]);
      //   tresult.push(response.data.data[i]);
      // }
      // setResult(response.data.data[0]);
      // console.log(response.data.data[0]['country'])
      // console.log(result);
      // console.log(result[0]['country'])
      var distance = 20000000000;
      var reserve_name = "";
      var reserve_country = "";

      // console.log(mappedData);

      data.forEach((position, i) => {
        var dist_calc = getDistance(
          position['latitude'], position['longitude'],
          mappedData[0]['latitude'], mappedData[0]['longitude']
        )
            if (dist_calc < distance) {
                distance = dist_calc;
                reserve_name = mappedData[i]['lake_name'];
                reserve_country = mappedData[i]['country'];
            }
      });


      // console.log(response.data.data[0]['latitude'])
      // console.log(dist_calc);
      // console.log(reserve_name);
      // console.log(reserve_country);
      setLake(reserve_name);
      setCountry(reserve_country);
    })
    // .then(
      // handleForce()
    // )
    .catch(error => {
      console.log(error);
    });

    // handleForce();
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

  // const stateOptions = [
  //   {value: 'NSW', text: 'New South Wales'},
  //   {value: 'NT', text: 'Northern Territory'},
  //   {value: 'ACT', text: 'Australian Capital Territory'},
  //   {value: 'TAS', text: 'Tasmania'},
  //   {value: 'VIC', text: 'Victoria'},
  //   {value: 'WA', text: 'Western Australia'},
  //   {value: 'SA', text: 'South Australia'},
  //   {value: 'QLD', text: 'Queensland'},
  // ]

  // const typeOptions = [
  //   {value: 'A', text: 'A'},
  //   {value: 'B', text: 'B'},
  //   {value: 'C', text: 'C'}
  // ]

    // const [state, setState] = React.useState(stateOptions[0].value);
  // const [type, setType] = React.useState(typeOptions[0].value);
  // const [debug, setDebug] = React.useState();

  // const handleStateChange = event => {
  //   setState(event.target.value);
  // };

  // const handleTypeChange = event => {
  //   setType(event.target.value);
  // };

//   {/* <div className="form-body">
//   <label for="states">State</label>
//   <select id="states" value={state} onChange={handleStateChange}>
//     {stateOptions.map(stateOptions => (
//       <option>
//         {stateOptions.text}
//       </option>
//     ))}
//   </select>
//   </div> */}
//   {/* <div className="form-body">
//     <label for="suburb">Suburb</label>
//     <input type="text" id="suburb"></input>
//   </div> */}
//   {/* <div className="form-body">
//     <label for="postcode">Postcode</label>
//     <input type="text" id="postcode"></input>
//   </div> */}
//   {/* <div className="form-body">
//   <label for="types">Type</label>
//   <select id="types" value={type} onChange={handleTypeChange}>
//     {typeOptions.map(typeOptions => (
//       <option>
//         {typeOptions.text}
//       </option>
//     ))}
//   </select>
// </div> */}