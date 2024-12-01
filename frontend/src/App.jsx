import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // Correct imports for React Router v5
import Home from './component/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/chat" exact component={Chat} /> */}

      </Switch>
    </BrowserRouter>
  );
}

export default App;
