import React from "react";
import PropTypes from "prop-types";

import FormCheck from "react-bootstrap/FormCheck";

function DarkModeToggle({ handleToggleDarkMode }) {
  DarkModeToggle.propTypes = {
    handleToggleDarkMode: PropTypes.func.isRequired,
  };

  return (
    
      <FormCheck 
        type="switch"
        id="flexSwitchCheckDefault"
        label="Dark Mode"
        onClick={() =>
          handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
        }
      />

  );
}

export default DarkModeToggle;
