import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <header className="title">
          WaterOne
        </header>
        <div className="subtitle">
          Ⓒ 2022 MinusOne
        </div>
      </div>
      <div className="body">
        <form>
          <div className="form-body">
            <label for="states">State</label>
            <select id="states">
              <option>New South Wales</option>
              <option>Tasmania</option>
              <option>Victoria</option>
              <option>Western Australia</option>
              <option>South Australia</option>
              <option>Queensland</option>
            </select>
            </div>
            <div className="form-body">
            <label>Type</label>
            <select id="Type">
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
        </form>
        <button>LOCATE</button>
      </div>
    </div>
  );
}

export default App;
