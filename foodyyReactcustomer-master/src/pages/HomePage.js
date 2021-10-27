import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";
import jwt from "jsonwebtoken";
import Categories from "../components/Categories";
import KitchenList from "../components/KitchenList";
import Footer from "../components/Footer";
import { days, monthNames } from "../helper/date";
import { Redirect, Route } from "react-router-dom";
import { removeUser } from "../redux/User/actions";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { ToastContainer } from "react-toastify";
const HomePage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [homeLoading, setHomeLoading] = useState(true);
  const [supportsTakeaway, setsupportsTakeaway] = useState(true);
  const [delivery, setDelivery] = useState(true);
  const [both, setBoth] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (localStorage.getItem("food-app-token")) {
      jwt.verify(
        localStorage.getItem("food-app-token"),
        "THE-FOOD-APP",
        (err, decode) => {
          if (err) {
            console.log(decode);
            dispatch(removeUser());
            console.log("expired");
            <Route
              render={(props) => <Redirect to={{ pathname: "/signin" }} />}
            />;
          }
        }
      );
    } else {
      return (
        <Route render={(props) => <Redirect to={{ pathname: "/signin" }} />} />
      );
    }
  }, [user]);

  const toggleDelivery = (e) => {
    setDelivery(!delivery);
  };

  const toggleTakeaway = (e) => {
    setsupportsTakeaway(!supportsTakeaway);
  };

  const toggleBoth = (e) => {
    setBoth(!both);
  };

  function nextDay(i) {
    var today = new Date();
    var nextweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i
    );
    return nextweek;
  }
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Container fluid>
      {
        // <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      }
      <ResponsiveNavbar />
      <ToastContainer />

      <Categories />
      <Container>
        <Row className="mt-4">
          <Col xl={3}>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              style={{ borderRadius: "3rem" }}
            >
              <DropdownToggle
                style={{
                  borderRadius: "3rem",
                  background: "white",
                  color: "gray",
                }}
                caret
              >
                Order date
              </DropdownToggle>
              <DropdownMenu>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                  return (
                    <DropdownItem key={i}>
                      {`${days[nextDay(i).getDay()].slice(0, 3)} ${nextDay(
                        i
                      ).getDate()} ${monthNames[nextDay(i).getMonth()]}`}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col xl={5}></Col>
          <Col xl={4} className="d-flex justify-content-end align-items-center">
            <div className="d-flex ">
              <h6 style={{ width: "5rem" }}>Both</h6>
              <label className="switch" htmlFor="both">
                <input
                  type="checkbox"
                  checked={both}
                  id="both"
                  onChange={toggleBoth}
                />
                <div className="slider round"></div>
              </label>
            </div>
            <div className="d-flex mx-4">
              <h6 style={{ width: "5rem" }}>Delivery</h6>
              <label className="switch" htmlFor="delivery">
                <input
                  type="checkbox"
                  onChange={(e) => toggleDelivery(e)}
                  checked={delivery}
                  id="delivery"
                />
                <div className="slider round"></div>
              </label>
            </div>
            <div className="d-flex ">
              <h6 style={{ width: "5rem" }}>Takeaway</h6>
              <label className="switch" htmlFor="takeaway">
                <input
                  type="checkbox"
                  checked={supportsTakeaway}
                  id="takeaway"
                  onChange={toggleTakeaway}
                />
                <div className="slider round"></div>
              </label>
            </div>
          </Col>
        </Row>
      </Container>
      <KitchenList
        homeLoading={homeLoading}
        setHomeLoading={setHomeLoading}
        both={both}
        isVeg={delivery}
        supportsTakeaway={supportsTakeaway}
      />
      <Footer />
    </Container>
  );
};

export default HomePage;
