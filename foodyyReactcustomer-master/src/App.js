import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer} from 'react-toastify';

import Signin from "./pages/Signin";
import { Redirect } from "react-router";
import AuthMiddleware from "./router/middleware/AuthMiddleware";
import { protectedRoutes, publicRoutes } from "./router/allRoutes";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "./redux/User/actions";
import jwt from "jsonwebtoken";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (localStorage.getItem("food-app-token")) {
      jwt.verify(
        localStorage.getItem("food-app-token"),
        "THE-FOOD-APP",
        (err, decode) => {
          if (err) {
            console.log(decode);
            dispatch(removeUser());
            console.log("expired");
            <Route
              render={(props) => <Redirect to={{ pathname: "/signin" }} />}
            />;
          }
        }
      );
    } else {
      return (
        <Route render={(props) => <Redirect to={{ pathname: "/signin" }} />} />
      );
    }
  }, [user]);

  return (
    <React.Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin" component={Signin} />

          {publicRoutes.map((route, inx) => {
            return (
              <AuthMiddleware
                path={route.path}
                component={route.component}
                isAuthProtected={false}
                key={inx}
                exact
              />
            );
          })}

          {protectedRoutes.map((route, inx) => {
            return (
              <AuthMiddleware
                path={route.path}
                component={route.component}
                isAuthProtected={!localStorage.getItem("food-app-token")}
                key={inx}
                exact
              />
            );
          })}

          {
            // <Route exact path="/" component={HomePage} />
            // <Route exact path="/kitchen-details/:id" component={KitchenDetails} />
            // <Route exact path="/checkout" component={Checkout} />
            // <Route exact path="/welcome" component={LandingPage} />
            // <Route exact path="/become-a-chef" component={BecomeAChef} />
            // <Route exact path="/account" component={Profile} />
            // <Route exact path="/account/orders" component={Orders} />
            // <Route exact path="/signup" component={Signup} />
            // <Route exact path="/signin" component={Signin} />
          }
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
