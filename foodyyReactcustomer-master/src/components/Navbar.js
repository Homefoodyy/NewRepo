import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Card,
  CardHeader,
  CardImg,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Popover,
  PopoverBody,
  PopoverHeader,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import PinkLogo from "../assets/brand/pink-icon.svg";
import api from "../helper/apiHelper";
import { addZipCode } from "../redux/User/actions";
const Navbar = ({ setSearchTerm, searchTerm = "" }) => {
  const history = useHistory();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const [zipCode, setZipCode] = useState(user.zip_code);
  const [dishes, setDishes] = useState([]);
  const [showSuggestion, setShowSuggestions] = useState(false);
  // const [result, setResult] = useState([]);

  const dispatch = useDispatch();

  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(() => {
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
          console.log(dishes);
        } catch (err) {
          console.error(err);
        }
      };
      retriveData();
    }
    console.log(localStorage.getItem("food-app-zip-code"));

    return () => {
      setShowSuggestions(false);
    };
  }, [searchTerm]);

  return (
    <React.Fragment>
      <Row
        fluid
        className="d-flex align-items-center justify-content-between p-2"
      >
        <Col xl={1}>
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
        </Col>
        <Col xl={1} xs={12} className="d-flex justify-content-start">
          <h6
            className="text-decoration-underline"
            onClick={toggle}
            id="Popover"
            style={{ cursor: "pointer" }}
          >
            {localStorage.getItem("food-app-zip-code") || "enter zip code"}
          </h6>
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target="Popover"
            toggle={toggle}
          >
            <PopoverHeader>Pincode</PopoverHeader>
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
                        toggle();
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
        </Col>
        <Col
          xl={6}
          xs={12}
          className="d-flex align-items-center justify-content-center flex-column"
        >
          <Input
            style={{ maxWidth: "18rem" }}
            type="search"
            name="searchTerm"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            id="search"
            placeholder="cuisines, dishes..."
          />
          <div style={{ width: "18rem" }} className="bg-light">
            {showSuggestion && (
              <Card
                style={{ zIndex: "1", position: "fixed", width: "18rem" }}
                className="d-flex"
              >
                {dishes.map((dish) => (
                  <React.Fragment>
                    <Row className="p-1" style={{ cursor: "pointer" }}>
                      <Col xl={4}>
                        <CardImg
                          key={dish.d_id}
                          style={{ height: "50px", width: "50px" }}
                          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
                          alt="dish"
                        />
                      </Col>
                      <Col xl={8}>
                        <CardHeader style={{ width: "100%" }}>
                          <CardTitle>{dish.dish_name}</CardTitle>
                        </CardHeader>
                      </Col>
                    </Row>
                  </React.Fragment>
                ))}
              </Card>
            )}
          </div>
        </Col>
        <Col xl={2} md={4} xs={12} className="d-flex justify-content-center">
          <Button
            outline
            to="become-a-chef"
            style={{ width: "100%" }}
            className="btn rounded-pill btn-primary"
            onClick={() => {
              history.push("/become-a-chef");
            }}
          >
            Join as a home chef
          </Button>
        </Col>
        <Col xl={1} md={4} xs={12} className="d-flex justify-content-center">
          {localStorage.getItem("food-app-token") ? (
            <Button
              outline
              to="become-a-chef"
              className="btn rounded-pill btn-danger primaryColor"
              style={{ width: "100%" }}
              onClick={() => {
                history.push("/account");
              }}
            >
              Account
            </Button>
          ) : (
            <Button
              outline
              to="become-a-chef"
              style={{ width: "100%" }}
              className="btn rounded-pill btn-light "
              onClick={() => {
                history.push("/signin");
              }}
            >
              Login
            </Button>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Navbar;
