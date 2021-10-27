import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverHeader,
  PopoverBody,
  Col,
  Row,
  FormGroup,
  Input,
  Button,
  Form,
  CardImg,
  Card,
} from "reactstrap";
import PinkLogo from "../assets/brand/pink-icon.svg";
import api from "../helper/apiHelper";
import { addZipCode } from "../redux/User/actions";

const ResponsiveNavbar = () => {
  const dispatch = useDispatch();
  const [zipCode, setZipCode] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [dishes, setDishes] = useState([]);
  const [showSuggestion, setShowSuggestions] = useState(false);
  const history = useHistory();

  const navToggle = () => setIsNavOpen(!isNavOpen);


  useEffect(() => {
    setZipCode(localStorage.getItem("food-app-zip-code"));
    if (searchTerm.length === 0) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
      const retriveData = async () => {
        try {
          const result = await api.get(`/dishes`);
          setDishes(
            result.data.data.filter((dish) => {
              return dish.dish_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            })
          );
        } catch (err) {
          console.error(err);
        }
      };
      retriveData();
    }

    return () => {
      setShowSuggestions(false);
    };
  }, [searchTerm]);

  return (
    <div>
      <Navbar
        color="light"
        light
        expand="md"
        className="d-flex justify-content-between"
      >
        <NavbarBrand>
          <img
            src={PinkLogo}
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/home");
            }}
            alt="logo"
            height="50"
            width="50"
          />
        </NavbarBrand>
        <NavbarToggler onClick={navToggle} />
        <Collapse isOpen={isNavOpen} navbar className="justify-content-around">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                id="Popover"
                tag="h6"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setPopoverOpen(!popoverOpen);
                }}
              >
                {localStorage.getItem("food-app-zip-code") || ""}
              </NavLink>
              <Popover
                placement="bottom"
                isOpen={popoverOpen}
                target="Popover"
                toggle={navToggle}
              >
                <PopoverHeader>Pincode / Zipcode</PopoverHeader>
                <PopoverBody>
                  <Row>
                    <Col xl={8}>
                      <FormGroup>
                        <Input
                          type="text"
                          name="zip"
                          id="exampleZip"
                          onChange={(e) => setZipCode(e.target.value)}
                          value={zipCode}
                        />
                      </FormGroup>
                    </Col>
                    <Col xl={4}>
                      <FormGroup>
                        <Button
                          onClick={() => {
                            dispatch(addZipCode(zipCode));
                            setPopoverOpen(false);
                          }}
                          className="btn-primary rounded-pill"
                          size="xs"
                        >
                          Go
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </PopoverBody>
              </Popover>
            </NavItem>
            <Form>
              <Input
                type="search"
                name="searchTerm"
                className="mx-xl-5"
                autoComplete="off"
                id="search"
                placeholder="cuisines, dishes..."
                value={searchTerm}
                onFocus={() => setShowSuggestions(true)}
                // onBlur={() => setShowSuggestions(false)}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <div style={{ width: "18rem" }} className="bg-light">
                {showSuggestion && (
                  <Card
                    style={{
                      zIndex: "1",
                      position: "absolute",
                      width: "19rem",
                      height: "26rem",
                      overflowY: "scroll",
                      overflowX: "hidden",
                    }}
                    className="d-flex mt-1 mx-xl-5 p-2"
                  >
                    {dishes.map((dish) => (
                      <React.Fragment>
                        <Row
                          className=" p-1 table-hover"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            history.push(`/kitchen-details/${dish.k_id}`);
                            setShowSuggestions(false);
                          }}
                        >
                          <Col
                            xl={3}
                            xs={3}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <CardImg
                              key={dish.d_id}
                              style={{
                                borderRadius: "50%",
                                height: "50px",
                                width: "50px",
                              }}
                              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
                              alt="dish"
                            />
                          </Col>
                          <Col
                            xl={9}
                            xs={9}
                            className="d-flex flex-column align-items-start justify-content-center py-2"
                          >
                            <h6>{dish.dish_name}</h6>
                            <small className="text-muted">
                              {dish.kitchen_name}
                            </small>
                          </Col>
                        </Row>
                      </React.Fragment>
                    ))}
                  </Card>
                )}
              </div>
            </Form>
          </Nav>
          <Nav style={{ display: "flex", justifySelf: "end" }}>
            <NavItem>
              <Button
                outline
                to="become-a-chef"
                style={{ width: "100%" }}
                className="btn rounded-pill  btn-secondary m-sm-1"
                onClick={() => {
                  history.push("/become-a-chef");
                }}
              >
                Join as a home chef
              </Button>
            </NavItem>
            <NavItem>
              <Button
                outline
                to="become-a-chef"
                style={{ width: "100%" }}
                className="btn rounded-pill btn-secondary m-sm-1"
                onClick={() => {
                  history.push("/join-as-a-delivery-partner");
                }}
              >
                Join as a delivery partner
              </Button>
            </NavItem>
            <NavItem>
              <Button
                outline
                to="become-a-chef"
                style={{ width: "100%" }}
                className="btn rounded-pill btn-secondary m-sm-1"
                onClick={() => {
                  history.push("/about-us");
                }}
              >
                About us
              </Button>
            </NavItem>
            <NavItem>
              {localStorage.getItem("food-app-token") ? (
                <Button
                  outline
                  to="become-a-chef"
                  className="btn rounded-pill btn-primary m-sm-1"
                  style={{ width: "100%" }}
                  onClick={() => {
                    history.push("/account/profile");
                  }}
                >
                  Account
                </Button>
              ) : (
                <Button
                  outline
                  to="become-a-chef"
                  style={{ width: "100%" }}
                  className="btn rounded-pill btn-primary m-sm-1"
                  onClick={() => {
                    history.push("/signin");
                  }}
                >
                  Login
                </Button>
              )}
            </NavItem>
            {
              //         <UncontrolledDropdown nav inNavbar>
              //       <DropdownToggle nav caret>
              //         Options
              //       </DropdownToggle>
              //       <DropdownMenu right>
              //         <DropdownItem>Option 1</DropdownItem>
              //         <DropdownItem>Option 2</DropdownItem>
              //         <DropdownItem divider />
              //         <DropdownItem>Reset</DropdownItem>
              //       </DropdownMenu>
              //     </UncontrolledDropdown>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default ResponsiveNavbar;
