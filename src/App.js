import PropTypes from "prop-types";
import React, { Suspense } from "react";

import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes
import {
  publicRoutes,
  userRoutes,
  // authRoutes
} from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Pages404 = React.lazy(() => import("./pages/Utility/pages-404"));
const Pages500 = React.lazy(() => import("./pages/Utility/pages-500"));

const App = (props) => {
  function getLayout() {
    let layoutCls = VerticalLayout;

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout();
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {/* Non-Auth Protected */}
            {publicRoutes.map((route, idx) => (
              <Authmiddleware
                key={`public-${idx}`}
                path={route.path}
                component={route.component}
                layout={NonAuthLayout}
                isAuthProtected={false}
              />
            ))}
          </Switch>
        </Suspense>

        <Suspense fallback={<div>Logging in...</div>}>
          <Switch>
            {userRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                user={props.user}
                exact
              />
            ))}

            <Authmiddleware
              path="/404"
              component={Pages404}
              layout={NonAuthLayout}
              isAuthProtected={false}
            />
            <Authmiddleware
              path="/500"
              component={Pages500}
              layout={NonAuthLayout}
              isAuthProtected={false}
            />
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
  user: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
    user: state.Login.user,
  };
};

export default connect(mapStateToProps, null)(App);
