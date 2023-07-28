import "./styles.css";
import "../../bootstrap.min.css";
import { Container, Navbar, Nav, Badge, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Product from "./Product";
//import AppDrawer from "./AppDrawer";

import { Collapse } from "react-bootstrap";
import {
  Drawer,
  DrawerOverflow,
  DrawerToC,
  DrawerToggle,
  DrawerNavigationHeader,
  DrawerNavigation,
} from "react-bootstrap-drawer";
import Restos from "./Restos";

export default function Dash(props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const id = params.get("id");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile`, {
          headers: { Authorization: "Bearer " + token },
        });

        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const handleClick1 = () => [
    setOpen1(true),
    setOpen2(false),
    setOpen3(false),
    setOpen4(false),
  ];
  const handleClick2 = () => [
    setOpen1(false),
    setOpen2(true),
    setOpen3(false),
    setOpen4(false),
  ];
  const handleClick3 = () => [
    setOpen1(false),
    setOpen2(false),
    setOpen3(true),
    setOpen4(false),
  ];
  const handleClick4 = () => [
    setOpen1(false),
    setOpen2(false),
    setOpen3(false),
    setOpen4(true),
  ];

  return (
    <div className="App">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top">
        <Container fluid>
          <Navbar.Brand href="#home">Elmida-admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end">
            <Nav>
              <Nav.Link
                eventKey={2}
                onClick={() => {
                  window.location.href = `/`;
                }}>
                Deconnection <Badge bg="warning"></Badge>
                <span className="visually-hidden">unread messages</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="position-relative">
        <div className="vh-100 col-lg-2 col-md-3 col-sm-4 col-xs-12 position-absolute top-0 start-0 shadow p-3 bg-body">
          <Drawer className={props.className}>
            <Collapse in={true}>
              <DrawerOverflow>
                <DrawerToC>
                  {/* Your Navigation Goes Here */}
                  <DrawerNavigation className="text-start">
                    {/* Standard react-bootstrap Nav.Item / Nav.Link */}
                    {/* Caveat: CSS provides custom styles */}
                    <Nav
                      defaultActiveKey="/home"
                      variant="pills"
                      className="flex-column">
                      <Nav.Link
                        eventKey="link-0"
                        onClick={handleClick1}
                        aria-controls="component1"
                        aria-expanded={open1}>
                        Utilisateurs
                      </Nav.Link>
                      <Nav.Link
                        eventKey="link-1"
                        onClick={handleClick2}
                        aria-controls="component2"
                        aria-expanded={open2}>
                        Restaurants
                      </Nav.Link>
                      <Nav.Link
                        eventKey="link-2"
                        onClick={handleClick3}
                        aria-controls="component3"
                        aria-expanded={open3}>
                        Messages
                      </Nav.Link>
                    </Nav>
                  </DrawerNavigation>
                </DrawerToC>
              </DrawerOverflow>
            </Collapse>
          </Drawer>
        </div>
      </div>
      <Container fluid>
        <Row className="flex-xl-nowrap">
          <Col xs={12} sm={4} md={3} lg={2} />
          <Col xs={12} sm={8} md={9} lg={10}>
            <Collapse in={open1}>
              <div id="component1">
                <Product />
              </div>
            </Collapse>
            <Collapse in={open2}>
              <div id="component2">
                <Restos />
              </div>
            </Collapse>
            <Collapse in={open3}>
              <div id="component3">
                <h3>messages</h3>
              </div>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
