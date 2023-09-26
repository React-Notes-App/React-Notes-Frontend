import React from 'react'
import PropTypes from 'prop-types'

function Header({ handleToggleDarkMode }) {
    Header.propTypes = {
      handleToggleDarkMode: PropTypes.func.isRequired,
    };
  
    return (
      <div className="header">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onClick={() =>
              handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
            }
          ></input>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Dark Mode
          </label>
        </div>
      </div>
    );
  }
  
  export default Header;
  