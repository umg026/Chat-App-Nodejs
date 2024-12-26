import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; // Correct imports for React Router v5
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './component/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useAuthStore } from './store/useAuth';
import { useEffect } from 'react';
import Settings from './pages/Settings';
import { useThemeStore } from './store/useTheme';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const { theme } = useThemeStore()
  useEffect(() => {
    checkAuth()

  }, [checkAuth])

  if (isCheckingAuth && !authUser) return <div>Loading...</div>
   console.log("auth user", authUser);

  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Switch>
          <Route path="/" exact render={() => (authUser ? <Home /> : <Redirect to="/login" />)} />
          <Route path="/setting" exact render={() => (authUser ? <Settings /> : <Redirect to="/login" />)} />
          <Route path="/signup" exact render={() => (!authUser ? <Signup /> : <Redirect to="/" />)} />
          <Route path="/login" exact render={() => (!authUser ? <Login /> : <Redirect to="/" />)} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
