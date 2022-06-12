import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { showRightSidebarAction, toggleLeftmenu } from "../../../store/actions"
import Avatar from 'react-avatar';

const ProfileMenu = props => {
  const [menu, setMenu] = useState(false)
  const [username, setusername] = useState(false)

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <Avatar className="rounded-circle header-profile-user" size="30" name={"Test User"} />
          <span className="d-none d-xl-inline-block ms-1">{"Test User"}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
        </DropdownToggle>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  toggleLeftmenu: PropTypes.func
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  const { layoutType, showRightSidebar, leftMenu } = state.Layout
  return { error, success, layoutType, showRightSidebar, leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {
    showRightSidebarAction,
    toggleLeftmenu,
  })(withTranslation()(ProfileMenu))
)