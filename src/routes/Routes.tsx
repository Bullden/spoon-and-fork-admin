import React, {Suspense, useEffect} from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import Auth from './auth';
import Loader from '../components/Loader/Loader';
import Config from 'app/Config';
import AppRoute from './AppRoute';
import Layout from 'layouts';
import Orders from './orders/Orders';
import OrderDetails from './orders/details/OrderDetails';
import Clients from './clients/Clients';
import ClientDetails from './clients/details/ClientDetails';
import Couriers from './couriers/Couriers';
import CourierDetails from './couriers/details/CourierDetails';
import Laundries from './laundries/Laundries';
import LaundryDetails from './laundries/details/LaundryDetails';
import InformationPages from 'routes/informationPages/InformationPages';
import {useAuthActions} from 'state/hooks/UseActions';
import Settings from 'routes/settings/Settings';

const Logout = () => {
  const actions = useAuthActions();
  useEffect(() => {
    actions.logout();
  }, []);
  return <></>;
};

const Routes: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter basename={Config.getPublicUrl()}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth" />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/main">
            <Redirect to="/orders" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/customers" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/couriers" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/laundries" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/informationPages" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/settings" />
          </Route>
          <AppRoute exact path="/orders" component={Orders} layout={Layout.AdminLayout} />
          <AppRoute
            exact
            path="/orders/:id"
            component={OrderDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/informationPages"
            component={InformationPages}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/informationPages/create"
            component={InformationPages}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/informationPages/:id"
            component={InformationPages}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/customers"
            component={Clients}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/customers/:clientId"
            component={ClientDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/customers/:clientId/editProfile"
            component={ClientDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/couriers"
            component={Couriers}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/couriers/:courierId"
            component={CourierDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/couriers/:courierId/documents"
            component={CourierDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/couriers/:courierId/changingHistory"
            component={CourierDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/couriers/:courierId/ordersHistory"
            component={CourierDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/laundries"
            component={Laundries}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/settings"
            component={Settings}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/laundries/:laundryId"
            component={LaundryDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/laundries/:laundryId/editProfile"
            component={LaundryDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/auth"
            component={Auth.Welcome}
            layout={Layout.AuthLayout}
          />
          <AppRoute
            exact
            path="/signUp"
            component={Auth.SignUp}
            layout={Layout.AuthLayout}
          />
          <AppRoute
            exact
            path="/forgotPassword"
            component={Auth.ForgotPassword}
            layout={Layout.AuthLayout}
          />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
