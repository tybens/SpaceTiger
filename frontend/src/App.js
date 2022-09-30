import "./App.css";
import Button from "@mui/material/Button";

function App() {
  const handleButtonClick = () => {
    console.log('hello')
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetch("http://localhost:5000/data").then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        console.log({
          name: data.Name,
          age: data.Age,
          date: data.Date,
          programming: data.programming,
        });
      })
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1> Hello Cos333 World </h1>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Test Backend
        </Button>
      </header>
    </div>
  );
}

export default App;
