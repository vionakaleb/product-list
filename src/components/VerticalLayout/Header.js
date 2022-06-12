import PropTypes from "prop-types";
import React, { useState } from "react";

import { connect } from "react-redux";
import { Form, Input, Button, Row, Col, Container } from "reactstrap";

import { Link } from "react-router-dom";

// Reactstrap
import { Dropdown } from "reactstrap";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

// import { ReactComponent as logoSm } from '../../assets/logo.svg';

//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";

const Header = (props) => {
  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 768) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <Container fluid>
            <div className="float-end">
              <Dropdown className="d-none d-lg-inline-block ms-1">
                <button
                  type="button"
                  onClick={() => {
                    toggleFullscreen();
                  }}
                  className="btn header-item noti-icon waves-effect"
                  data-toggle="fullscreen"
                >
                  <i className="mdi mdi-fullscreen"></i>
                </button>
              </Dropdown>
              <ProfileMenu />
            </div>
            <div>
              <div className="navbar-brand-box">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={"https://raw.githubusercontent.com/vionakaleb/Interview-Frontend-Web/9b4a5d52f3861dfc53ff86064ce70d30ff936dd6/logo/logo.svg"} alt="" height="40" />
                  </span>
                  <span className="logo-lg">
                    <img src={"https://raw.githubusercontent.com/vionakaleb/Interview-Frontend-Web/9b4a5d52f3861dfc53ff86064ce70d30ff936dd6/logo/logo.svg"} alt="" height="40" />
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={"https://raw.githubusercontent.com/vionakaleb/Interview-Frontend-Web/9b4a5d52f3861dfc53ff86064ce70d30ff936dd6/logo/logo.svg"} alt="" height="40" />
                  </span>
                  <span className="logo-lg">
                    <img src={"https://raw.githubusercontent.com/vionakaleb/Interview-Frontend-Web/9b4a5d52f3861dfc53ff86064ce70d30ff936dd6/logo/logo.svg"} alt="" height="40" />
                  </span>
                </Link>
              </div>
              <button
                type="button"
                className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
                data-toggle="collapse"
                onClick={() => {
                  tToggle();
                }}
                data-target="#topnav-menu-content"
              >
                <i className="fa fa-fw fa-bars"></i>
              </button>
            </div>
          </Container>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
  user: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  const { user } = state.Login;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType, user };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
