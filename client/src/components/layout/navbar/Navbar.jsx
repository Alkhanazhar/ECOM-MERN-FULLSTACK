import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../../context/auth";
import { toast } from "react-toastify";
import { useCart } from "../../../context/cart";
import {  Badge } from "antd";

const NavbarComponent = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    window.localStorage.removeItem("auth");
    toast.success(`User logged out successfully`);
  };
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Link className={styles.a} to={"/home"}>
          <h4 className={styles.logo}>Ecommerce</h4>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav href="#home">
              <Link className={styles.a} to={"/home"}>
                Home
              </Link>
            </Nav>
            <Nav>
              <Link className={styles.a} to={"/about"}>
                About
              </Link>
            </Nav>
            <Nav>
              <Link className={styles.a} to={"/contact"}>
                Contact
              </Link>
            </Nav>
            {!auth.user ? (
              <>
                <Nav>
                  <Link className={styles.a} to={"/register"}>
                    Register
                  </Link>
                </Nav>
                <Nav>
                  <Link className={styles.a} to={"/login"}>
                    Login
                  </Link>
                </Nav>
              </>
            ) : (
              <>
                <Nav>
                  <Link
                    className={styles.a}
                    to={`/dashboard/${
                      auth.user.role == "admin" ? "admin" : "user"
                    }`}
                  >
                    dashboard
                  </Link>
                </Nav>
                <Nav onClick={handleLogout} href="#link" className={styles.a}>
                  <Link className={styles.a} to={"/login"}>
                    logout
                  </Link>
                </Nav>
                <Nav>
                  <Link className={styles.a} to={"/cart"}>
                    Cart
                    <sup className="bg-white text-black px-2 ms-2">
                      <Badge>{cart?.length}</Badge>
                    </sup>
                  </Link>
                </Nav>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
