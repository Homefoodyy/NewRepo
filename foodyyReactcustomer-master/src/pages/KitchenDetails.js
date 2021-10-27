import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  CardFooter,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  Badge,
  Button,
  Card,
  ListGroup,
} from "reactstrap";
import CartableCard from "../components/CartableCard";
import api from "../helper/apiHelper";
import { days, monthNames } from "../helper/date";
import Loading from "../components/Loading";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemToCart } from "../redux/Cart/actions";
function nextDay(i) {
  var today = new Date();
  var nextweek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + i
  );
  return nextweek;
}
const KitchenDetails = () => {
  const params = useParams();
  const kitchenId = params.id;

  const [kitchen, setkitchen] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const history = useHistory();
  // const [checkOutItems, setCheckOutItems] = useState([]);

  useEffect(() => {
    setCartItems(
      Array.from(new Set(cart)).filter((dish) => {
        return dish.k_uid === Number(kitchenId);
      })
    );
  }, [cart, kitchenId]);
  const countQuantityInCart = (id) => {
    if (cartItems.length !== 0) {
      const retrivedDish = cartItems.find((dish) => {
        return dish.d_id === id;
      });
      return retrivedDish?.quantity || 0;
    }
  };
  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((dish) => {
      total += dish.price * dish.quantity;
    });
    return total;
  };

  useEffect(() => {
    const retriveData = async () => {
      try {
        const result = await api.get(`/kitchens/${params.id}`);
        setResult(result.data.data[0]);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    retriveData();
  }, [params.id]);

  useEffect(() => {
    const retriveData = async () => {
      try {
        const kitchenresult = await api.get(
          `/kitchens/zipcode/${localStorage.getItem("food-app-zip-code")}`
        );
if(kitchenresult){
  setkitchen(kitchenresult.data.data[0]);
  console.log(kitchenresult,kitchen)
}
        const result = await api.get(`/kitchens/${params.id}/dishes`);
        setDishes(result.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    retriveData();
  }, [params.id]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return loading ? (
    <Loading />
  ) : (
    <Container fluid>
      <ResponsiveNavbar />
      <Row>
        <Col xl={9} style={{ overflowY: "scroll", maxHeight: "85vh" }}>
          <img
            src={kitchen.cover_photo}
            style={{ width: "100%", height:"40vh", objectFit: "cover" }}
            alt="cover-food-header"
          />
          <Row className="mt-4">
            <Col xl={3}>
              <img
                src={kitchen.chefs_avatar}
                style={{
                  height: "180px",
                  width: "180px",
                  borderRadius: "50%",
                }}
                alt=""
              />
            </Col>
            <Col xl={9} className="mt-2">
              <h2>{kitchen.name}</h2>
              <h6>{kitchen.address_line}, {kitchen.street_address}</h6>
              <p> <b>Kitchen status:</b> {kitchen.kitchen_status}</p>
              <p> <b>Kitchen main categorie:</b> {kitchen.main_category}</p>
              <div className="d-flex align-items-center justify-content-start gap-2"><b>Chef name</b> {kitchen.chef_name}</div>
              <br />
              <i style={{ textOverflow: "ellipsis" }}>{kitchen.description}</i>
            </Col>
          </Row>
          <CardFooter>
            <Row>
              <Col xl={2}>
                <h4>MENU</h4>
              </Col>
              <Col xl={8}></Col>
              <Col xl={2}>
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
                    Order time
                  </DropdownToggle>
                  <DropdownMenu style={{ width: "18rem" }}>
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                      return (
                        <DropdownItem key={i}>
                          <Row>
                            <Col xl={7}>
                              <Input type="time" />
                            </Col>
                            <Col xl={5} onClick={() => setDropdownOpen(false)}>
                              {`${days[nextDay(i).getDay()].slice(
                                0,
                                3
                              )} ${nextDay(i).getDate()} ${
                                monthNames[nextDay(i).getMonth()]
                              }`}
                            </Col>
                          </Row>
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>

            <Row className="mt-3">
              {dishes.length === 0 ? (
                <Loading
                  loading={false}
                  msg="This kitchen do not sell any dishes currently"
                />
              ) : (
                dishes.map((dish) => (
                  <CartableCard key={dish.d_id} dish={dish} />
                ))
              )}
            </Row>
          </CardFooter>
        </Col>
        <Col xl={3} style={{ position: "static" }}>
          <React.Fragment>
            <Card
              className="d-flex align-items-center justify-content-start flex-column"
              style={{ height: "80vh", overflowY: "scroll" }}
            >
              {cartItems.length === 0 ? (
                <React.Fragment>
                  <span
                    className="material-icons mt-4"
                    style={{ fontSize: "64px" }}
                  >
                    shopping_cart
                  </span>
                  <small className="mt-2 text-muted">
                    Your cart is empty, Add items to get started
                  </small>
                </React.Fragment>
              ) : (
                <ListGroup style={{ width: "100%" }}>
                  {cartItems.map((dish) => {
                    return (
                      <Row
                        key={dish.d_id}
                        className="p-1 py-2 align-items-center"
                      >
                        <Col xl={4} className="d-flex align-items-center">
                          {countQuantityInCart(dish.d_id) > 0 ? (
                            <Button
                              style={{ height: "24px", width: "24px" }}
                              className={`btn p-2 a1 btn-sm btn-primary rounded-circle d-flex`}
                              onClick={() => {
                                dispatch(
                                  removeItemToCart({
                                    dish_name: dish.dish_name,
                                    price: dish.price,
                                    d_id: dish.d_id,
                                    quantity: 1,
                                  })
                                );
                              }}
                            >
                              <span
                                className="material-icons"
                                style={{
                                  color: "white",
                                  fontSize: "8px",
                                  alignSelf: "center",
                                  justifySelf: "center",
                                }}
                              >
                                remove
                              </span>
                            </Button>
                          ) : (
                            <Button
                              disabled
                              style={{ height: "24px", width: "24px" }}
                              className={`btn p-2 a1 btn-sm btn-primary rounded-circle d-flex`}
                            >
                              <span
                                className="material-icons"
                                style={{
                                  color: "white",
                                  fontSize: "8px",
                                  alignSelf: "center",
                                  justifySelf: "center",
                                }}
                              >
                                remove
                              </span>
                            </Button>
                          )}
                          <Badge
                            color="primary"
                            className="bg-primary mx-1 rounded-pill"
                            pill
                          >
                            {dish.quantity}{" "}
                          </Badge>
                          <Button
                            style={{ height: "24px", width: "24px" }}
                            className="btn px-1 btn-sm btn-primary rounded-circle d-flex"
                            onClick={() => {
                              dispatch(
                                addItemToCart({
                                  dish_name: dish.dish_name,
                                  price: dish.price,
                                  d_id: dish.d_id,
                                  quantity: 1,
                                })
                              );
                            }}
                          >
                            <span
                              className="material-icons"
                              style={{
                                color: "white",
                                fontSize: "12px",
                                alignSelf: "center",
                                justifySelf: "center",
                              }}
                            >
                              add
                            </span>
                          </Button>
                        </Col>
                        <Col
                          xl={5}
                          className="text-muted"
                          style={{ fontSize: "14px" }}
                        >
                          {dish.dish_name}
                        </Col>
                        <Col xl={3}>₹ {dish.price * dish.quantity}</Col>

                        <span className="mx-2"></span>
                      </Row>
                    );
                  })}
                </ListGroup>
              )}
            </Card>
            <Button
              style={{ width: "100%" }}
              onClick={() => {
                history.push("/checkout", {
                  checkOutItems: cartItems,
                });
              }}
              className="btn btn-primary mt-1"
            >
              Go to checkout{" "}
              <span className="mx-2 px-2 rounded-pill bg-white text-primary">
                ₹ {calculateTotalPrice()}{" "}
              </span>
            </Button>
          </React.Fragment>
        </Col>
      </Row>
    </Container>
  );
};

export default KitchenDetails;
