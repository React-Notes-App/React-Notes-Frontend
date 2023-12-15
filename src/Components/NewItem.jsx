import React from 'react'
import { FormControl, InputGroup, FormCheck } from 'react-bootstrap'

function NewItem({noteItem, setNoteItem}) {

   

    const itemCharacterLimit = 200;
    const handleItemChange = (event) => {
        if (itemCharacterLimit - event.target.value.length >= 0) {
          setNoteItem(event.target.value);
        }
        }
  return (
    <InputGroup className="d-flex align-items-center">
    <FormCheck />
    <FormControl
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "1rem",
      }}
      aria-label="noteItem"
      aria-describedby="basic-addon1"
      placeholder="Item"
      onChange={handleItemChange}
      value={noteItem}
      type='text'
    />
  </InputGroup>
  )
}

export default NewItem