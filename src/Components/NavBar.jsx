import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import { Container, Navbar, Nav, Form } from "react-bootstrap";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LogIn from "./LogIn";

function NavBar() {
  const { searchText, setSearchText } = useNoteAppContext();
  function handleSearch(event) {
    setSearchText(event.target.value);
    console.log(event.target.value);
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Notes</Navbar.Brand>
          <EditNoteIcon fontSize="large" className="me-2" />
          <Form.Control
            className="me-2 w-25"
            type="search"
            id="searchBar1"
            placeholder="Search"
            aria-label="Search"
            value={searchText}
            onChange={handleSearch}
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LogIn />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
