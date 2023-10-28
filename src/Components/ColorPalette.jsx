// Desc: This file contains the color palette component. This component is a modal that pops up when the user clicks on the color palette icon in the note component. The color palette component is a modal that contains a color picker component from react-color.

import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNoteAppContext } from '../Provider/NoteAppProvider'
import { CirclePicker } from "react-color";
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ColorPalette({id, color}) {
  ColorPalette.propTypes = {
  id: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  }

  const { editNoteColor } = useNoteAppContext()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const handleChangeComplete = (color) => {
    editNoteColor(id, color.hex);
  };

  return (
    <div>
      <PaletteOutlinedIcon onClick={handleShow}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="border-0">
          <Modal.Title>Select Color</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
        <CirclePicker
                color={color}
                onChangeComplete={handleChangeComplete}
              />
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ColorPalette;
