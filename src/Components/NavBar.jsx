import React from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import {
  ColumnViewToggle,
  GridViewToggle,
  LogInModal,
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
  Image,
} from "react-bootstrap";
import FaceIcon from "@mui/icons-material/Face";

function NavBar() {
  const {
    searchText,
    setSearchText,
    setDarkMode,
    columnView,
    setIsLoggedIn,
    setToken,
    setUser,
    isLoggedIn,
  } = useNoteAppContext();

  function handleSearch(event) {
    setSearchText(event.target.value);
    console.log(event.target.value);
  }

  let profilePic =
    "https://pyxis.nymag.com/v1/imgs/692/8f5/2180fb8d862b6a57d7b3f406795e950360-26-atomic-blonde.rsquare.w400.jpg";
  let style = {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%",
    objectFit: "cover",
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          {isLoggedIn ? (
          <SideNav setDarkMode={setDarkMode} />
          ) : null}
          <Navbar.Brand href="/">Notes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto p-2 align-items-center">
              <Form.Control
                className=" w-auto"
                type="search"
                id="searchBar1"
                placeholder="Search"
                aria-label="Search"
                value={searchText}
                onChange={handleSearch}
                style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}
              />
              {isLoggedIn ? (
                <Nav.Link id="profile1" className="me-2" href={"/profile"}>
                  Profile
                </Nav.Link>
              ) : null}
              {isLoggedIn ? (
                <Nav.Item
                  id="logout1"
                  className="me-2"
                  onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setToken("");
                    setUser("");
                  }}
                >
                  Logout
                </Nav.Item>
              ) : (
              <Nav.Item id="login1" className="me-2">
                <LogInModal />
              </Nav.Item>
              )}
              <NavLink id="dark-mode-toggle">
                <DarkModeToggle handleToggleDarkMode={setDarkMode} />
              </NavLink>

              {columnView ? (
                <NavLink id="grid-view-toggle">
                  <GridViewToggle />
                </NavLink>
              ) : (
                <NavLink id="column-view-toggle">
                  <ColumnViewToggle />
                </NavLink>
              )}
              <NavDropdown
                title={
                  profilePic ? (
                    <Image
                      src={profilePic}
                      roundedCircle={true}
                      fluid
                      style={style}
                    />
                  ) : (
                    <FaceIcon />
                  )
                }
                id="basic-nav-dropdown"
                drop="down"
                align={{ lg: "end" }}
              >
                {isLoggedIn ? (
                  <>
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                    <NavDropdown.Divider />
                  </>
                ) : null}

                {isLoggedIn ? (
                  <NavDropdown.Item
                    onClick={() => {
                      setIsLoggedIn(false);
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      setToken("");
                      setUser("");
                    }}
                  >
                    Log Out
                  </NavDropdown.Item>
                ) : (
                  <LogInModal />
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
