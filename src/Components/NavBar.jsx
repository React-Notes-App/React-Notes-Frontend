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
  Image,
} from "react-bootstrap";
import FaceIcon from "@mui/icons-material/Face";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ListAltOutlined from "@mui/icons-material/ListAltOutlined";
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
          {isLoggedIn ? <SideNav setDarkMode={setDarkMode} /> : null}
          <Navbar.Brand href="/notes">Notes</Navbar.Brand>
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
                <div id="navbar-dropdown-icons">
                  <AccountCircleOutlinedIcon id="profile1" />
                  <Nav.Link id="profile1" href={"/profile"}>
                    Profile
                  </Nav.Link>
                </div>
              ) : null}
              {isLoggedIn ? (
                <div id="navbar-dropdown-icons">
                  <LogoutOutlinedIcon id="logout1" />
                  <Nav.Item
                    id="logout1"
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
                </div>
              ) : (
                <div>
                  <LoginOutlinedIcon />
                  <Nav.Item id="login1" className="me-2">
                    <LogInModal />
                  </Nav.Item>
                </div>
              )}
              <Nav.Item id="dark-mode-toggle">
                <DarkModeToggle handleToggleDarkMode={setDarkMode} />
              </Nav.Item>

              {columnView ? (
                <Nav.Item id="grid-view-toggle">
                  <GridViewToggle />
                </Nav.Item>
              ) : (
                <Nav.Item id="column-view-toggle">
                  <ColumnViewToggle />
                </Nav.Item>
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
                  <div id="navbar-dropdown-icons">
                    <ListAltOutlined />
                    <NavDropdown.Item href="/notes">Notes</NavDropdown.Item>
                  </div>
                ) : null}
                {isLoggedIn ? (
                  <>
                    <div id="navbar-dropdown-icons">
                      <AccountCircleOutlinedIcon />
                      <NavDropdown.Item href="/profile">
                        Profile
                      </NavDropdown.Item>
                    </div>
                    <NavDropdown.Divider />
                  </>
                ) : null}

                {isLoggedIn ? (
                  <div id="navbar-dropdown-icons">
                    <LogoutOutlinedIcon />
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
                  </div>
                ) : (
                  <div id="navbar-dropdown-icons">
                    <LoginOutlinedIcon />
                    <LogInModal />
                  </div>
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
