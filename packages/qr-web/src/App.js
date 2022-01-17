import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './auth/account';
import MyOrders from './pages/my-orders/MyOrders';
import CreateOrder from './pages/create-order/CreateOrder';
import Home from './pages/home/Home';
import Login from './pages/Login/Login';
import UpdateOrder from './pages/update-order/UpdateOrder';
import CheckOrder from './pages/check-order/CheckOrder';
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
            <Route exact path="/my-orders" component={MyOrders} />
            <Route exact path="/my-orders/:id" component={UpdateOrder} />
            <Route exact path="/check-order/:id" component={CheckOrder} />
          </Switch>
          <ToastContainer autoClose={2000} />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
