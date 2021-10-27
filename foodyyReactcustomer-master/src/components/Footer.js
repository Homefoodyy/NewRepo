import React from "react";
import { Col, Container, Row } from "reactstrap";
import BlueLogoWithLine from "../assets/brand/white-footer-icon.svg";

import americanExpress from "../assets/cards/american-express.png";
import visa from "../assets/cards/visa.png";
import masterCard from "../assets/cards/master-card.png";
import dicover from "../assets/cards/discover.png";

const Footer = () => {
  return (
    <Container fluid>
      <Row className="d-flex justify-content-around mt-2 p-3 primaryColor">
        <Col xl={2} md={4} xs={6} className="justify-content-sm-center">
          <img
            src={BlueLogoWithLine}
            alt="blue-logo-name"
            style={{ height: "8rem", objectFit: "contain" }}
          />
        </Col>
        <Col
          xl={2}
          md={4}
          xs={6}
          className="d-flex flex-column align-items-center"
        >
          <ul>
            <li>
              <h6>Feedback</h6>
            </li>
            <li>Customers</li>
            <li>Home chefs</li>
            <li>Delivery partner</li>
          </ul>
        </Col>
        <Col
          xl={2}
          md={4}
          xs={6}
          className="d-flex flex-column align-items-center"
        >
          <ul>
            <h6>Join us</h6>
            <li>Join as a home chef</li>
            <li>Delivery partner</li>
            <li>Learn more</li>
          </ul>
        </Col>
        <Col
          xl={2}
          md={4}
          xs={6}
          className="d-flex flex-column align-items-center"
        >
          <ul>
            <li>
              <h6>Secure payment</h6>
            </li>
            <li>Become a chef</li>
            <li>Learn more</li>
          </ul>
        </Col>

        <Col xl={2} md={4} xs={6}>
          <Row>
            <Col xl={6}>
              <img
                src={americanExpress}
                style={{ width: "100%" }}
                alt="american-express"
              />
            </Col>
            <Col xl={6}>
              <img src={visa} style={{ width: "100%" }} alt="visa" />
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <img src={dicover} style={{ width: "100%" }} alt="discover" />
            </Col>
            <Col xl={6} className="d-flex align-items-center">
              <img
                src={masterCard}
                style={{ width: "100%", height: "3rem" }}
                alt="mastercard"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
