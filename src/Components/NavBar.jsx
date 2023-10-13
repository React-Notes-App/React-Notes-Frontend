import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import {
  ColumnViewToggle,
  GridViewToggle,
  LogIn,
  SideNav,
  DarkModeToggle,
} from "./";
import {
  Container,
  Navbar,
  Nav,
  Form,
  NavDropdown,
  NavLink,
} from "react-bootstrap";
import FaceIcon from "@mui/icons-material/Face";

function NavBar() {
  const { searchText, setSearchText, setDarkMode, columnView, setIsLoggedIn, setToken, setUser } =
    useNoteAppContext();

  function handleSearch(event) {
    setSearchText(event.target.value);
    console.log(event.target.value);
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <SideNav setDarkMode={setDarkMode} />
          <Navbar.Brand href="/">Notes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto p-2">
              <Form.Control
                className=" w-auto"
                type="search"
                id="searchBar1"
                placeholder="Search"
                aria-label="Search"
                value={searchText}
                onChange={handleSearch}
                style={{marginRight: "0.5rem", marginLeft: "0.5rem"}}
              />
              
              <DarkModeToggle handleToggleDarkMode={setDarkMode} />

              {columnView ? (
                <NavLink>
                  <GridViewToggle />
                </NavLink>
              ) : (
                <NavLink>
                  <ColumnViewToggle />
                </NavLink>
              )}
              <NavDropdown
                title={<FaceIcon />}
                id="basic-nav-dropdown"
                drop="down"
                align={{ lg: "end" }}
              >
                <LogIn />
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  setToken("");
                  setUser(""); 
                }}
                >Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
