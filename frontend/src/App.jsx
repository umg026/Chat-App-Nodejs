import { BrowserRouter, Route, Switch } from 'react-router-dom'; // Correct imports for React Router v5
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './component/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
    <Navbar/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
