import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import MenuContent from "./MenuContent";
import Avatar from "react-avatar";

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="h-100">
          <div className="user-wid text-center py-4">
            <div className="user-img">
              <Avatar
                  className="avatar-md mx-auto rounded-circle"
                  size="80"
                  name={"Test User"}
                />
            </div>

            <div className="mt-3">
              <Link to="#" className="text-dark fw-medium font-size-16">
                Test
              </Link>
              <p className="text-body mt-1 mb-0 font-size-13">
                User
              </p>
            </div>
          </div>
          <div data-simplebar className="h-100">
            {props.type !== "condensed" ? (
              <MenuContent />
            ) : (
              <MenuContent />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
