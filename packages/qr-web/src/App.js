import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './auth/account';
import CheckOrder from './pages/check-order/CheckOrder';
import CreateOrder from './pages/create-order/CreateOrder';
import Home from './pages/home/Home';
import Login from './pages/Login/Login';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/orders" component={Home} />
            <Route exact path="/orders/create-order" component={CreateOrder} />
            <Route exact path="/check-order" component={CheckOrder} />
          </Switch>
          <ToastContainer autoClose={2000} />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
