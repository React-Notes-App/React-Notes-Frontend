import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";

function DarkModeToggle({ handleToggleDarkMode }) {
  DarkModeToggle.propTypes = {
    handleToggleDarkMode: PropTypes.func.isRequired,
  };

  return (
   <Form>
    <FormCheck
      type="switch"
      id="dark-mode-toggle-switch"
      label="Dark Mode"
      onClick={() =>
        handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
      }
    />
  </Form>

  );
}

export default DarkModeToggle;
