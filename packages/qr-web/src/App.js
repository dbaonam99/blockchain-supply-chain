import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import CheckOrder from './pages/check-order/CheckOrder';
import CreateOrder from './pages/create-order/CreateOrder';
import Home from './pages/home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/orders" component={Home} />
        <Route exact path="/orders/create-order" component={CreateOrder} />
        <Route exact path="/check-order" component={CheckOrder} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
