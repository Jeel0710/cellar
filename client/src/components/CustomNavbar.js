import { NavLink } from 'react-router-dom';
import { userStore } from "../storage/store";
import { USER_LOGOUT } from "../storage/actiontype";
import { Container, Nav, Navbar } from 'react-bootstrap';

const CustomNavbar = (props) => {

    function handleLogout() {
        userStore.dispatch({
            type: USER_LOGOUT
        });
        window.localStorage.removeItem("user");
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" sticky="top">
            <Container>
                <NavLink className="navbar-brand" to={props.navlinks[0].path}>
                    Cellar-Tech
                </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        {
                            props.navlinks.map(navlink => {
                                return (
                                    <NavLink
                                        key={navlink.id}
                                        className={"nav-link " + ((navlink.path === window.location.pathname) ? " active" : "")}
                                        to={navlink.path}
                                    >
                                        {navlink.name}
                                    </NavLink>
                                );
                            })
                        }
                        <NavLink className="nav-link" to="/LogIn" onClick={handleLogout}>
                            LogOut
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;