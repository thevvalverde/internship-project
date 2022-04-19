import './App.css';
import { Button } from '@mui/material';

function App(props) {

  console.log("Im alive!");

  return (
    <div className="App">
      <br/><br/><br/><br/>
      <Button variant="contained">Hello Mr. {props.id}!</Button>
    </div>
  );
}

export default App;
