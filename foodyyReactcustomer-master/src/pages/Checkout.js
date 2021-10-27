import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  CustomInput,
  FormGroup,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

import Footer from "../components/Footer";
import api from "../helper/apiHelper";
import { useDispatch } from "react-redux";
import {  useHistory, useLocation } from "react-router-dom";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { clearCart } from "../redux/Cart/actions";

const Checkout = () => {
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [result, setResult] = useState({});
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    street_address: "",
    address_line: "",
    delivery_instructions: "",
  });

  const userId = localStorage.getItem("food-app-user-id");
  const location = useLocation();

  const dispatch = useDispatch();

  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [tip, setTip] = useState(0);

  const { checkOutItems } = location.state;

  // payment
  const [values, setValues] = useState({ amount: 0, orderId: "" });
  const { amount, orderId } = values;

  const options = {
    key: process.env.REACT_APP_RAZOR_KEY_ID,
    currency: "INR",
    amount: amount,
    name: "Homefoodyy",
    image: `http://localhost:5000/payment/logo`,
    order_id: orderId,
    prefill: {
      name: result.fname + " " + result.lname,
      email: result.email,
      contact: result.phone,
    },
    theme: {
      color: "#d60664",
    },
    handler: function (response) {
      onSuccessPaymentCallback(response);
    },
  };

  const onSuccessPaymentCallback = async (response) => {
    try {
      const res = await api.post("/payment/callback", {
        paymentResponse: response,
        orderData: cookOrderData(),
      });
      if (res.status !== 200) {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      dispatch(clearCart());
      history.push(`/payment-info/${response.razorpay_payment_id}`);
    } catch (err) {
      console.log(err);
      toast.error("Payment did not finished, Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const createOrder = async () => {
    try {
      const res = await api.post("/payment/order", {
        amount: totalPayableAmount,
      });
      setValues({
        amount: res.data.amount,
        orderId: res.data.id,
      });
    } catch (err) {
      toast.error("Something went wrong, Please try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(err);
    }
  };

  const onOrderPlaceClicked = (e) => {
    // e.preventDefault();
    if (
      inputs.address_line === "" &&
      inputs.name === "" &&
      inputs.phone === "" &&
      inputs.street_address === ""
    ) {
      toast.error("Please fill the delivery details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (amount > 0 && orderId !== "") {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    checkOutItems.forEach((dish) => {
      total += dish.price * dish.quantity;
    });
    return total;
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  useEffect(() => {
    console.log(totalPayableAmount);
    setTotalPrice(calculateTotalPrice());
    setTotalPayableAmount(tip + totalPrice);

    if (totalPayableAmount > 0) {
      createOrder();
    }
  }, [totalPrice, tip, calculateTotalPrice, createOrder, totalPayableAmount]);

  const cookOrderData = () => {
    const dishesOrdered = [];
    let totalQuantity = 0;
    checkOutItems.forEach((dish) => {
      totalQuantity += dish.quantity;
      dishesOrdered.push({
        d_id: dish.d_id,
        quantity: dish.quantity,
        price: dish.price * dish.quantity,
      });
    });

    const orderData = {
      c_id: userId,
      dishes: JSON.stringify(dishesOrdered),
      k_id: checkOutItems[0].k_id,
      quantity: totalQuantity,
      price: calculateTotalPrice(),
      payable_amount: totalPayableAmount,
      is_COD: 0,
      date: new Date().toISOString(),
      is_delivery: 1,
      name: inputs.name,
      phone: inputs.phone,
      street_address: inputs.street_address,
      address_line: inputs.address_line,
      delivery_instructions: inputs.delivery_instructions,
      tip,
    };

    return orderData;
    // retriveData();
  };

  useEffect(() => {
    const retriveData = async () => {
      try {
        const result = await api.get(`/customers/${userId}`);
        setResult(result.data.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    retriveData();
  }, [userId]);

  const newAddressToggle = () => {
    setIsNewAddress(!isNewAddress);
  };
  const onInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  return (
    <React.Fragment>
      <Container fluid>
        <ResponsiveNavbar />
        <ToastContainer />

        <Row>
          <Col xl={9}>
            <h3>Delivery address</h3>
            <FormGroup className="d-flex gap-2 my-2">
              {
                // <Label check for="exampleCustomRadio1" className="d-flex">
                //     Default address
                //     <CustomInput
                //       type="radio"
                //       className="mx-2"
                //       name="customRadio"
                //       id="exampleCustomRadio1"
                //       onChange={newAddressToggle}
                //     />
                //   </Label>
              }
              <Label check for="exampleCustomRadio2" className="d-flex">
                New address
                <CustomInput
                  checked
                  type="radio"
                  id="exampleCustomRadio2"
                  name="customRadio"
                  className="mx-2"
                  onChange={newAddressToggle}
                />
              </Label>
            </FormGroup>

            {
              // <Collapse isOpen={!isNewAddress}>
            }
            {
              // <Card>
              //   <CardBody>
              //     <h5>{result?.fname + " " + result?.lname}</h5>
              //     {result?.street_address + ", "}
              //     {result?.address_line}
              //   </CardBody>
              // </Card>
              //   //     <Collapse isOpen={isNewAddress}>
              //   //  </Collapse>
            }

            <Card>
              <CardBody>
                <Row>
                  <Col xl={6}>
                    <Label for="name" className="mt-2">
                      Name
                    </Label>
                    <input
                      type="text"
                      onChange={(e) => onInputChange(e)}
                      value={inputs.name}
                      name="name"
                      placeholder="Name"
                    />
                  </Col>
                  <Col xl={6}>
                    <Label for="phone" className="mt-2">
                      Phone
                    </Label>
                    <input
                      type="tel"
                      placeholder="Phone"
                      onChange={(e) => onInputChange(e)}
                      value={inputs.phone}
                      name="phone"
                    />
                  </Col>
                </Row>
                <Label for="street_address" className="mt-2">
                  Street Address
                </Label>
                <input
                  type="text"
                  onChange={(e) => onInputChange(e)}
                  value={inputs.street_address}
                  name="street_address"
                  placeholder="Landmark, City"
                />
                <Label for="address_line_2" className="mt-2">
                  Address Line 2
                </Label>
                <input
                  type="text"
                  name="address_line"
                  onChange={(e) => onInputChange(e)}
                  value={inputs.address_line}
                  placeholder="Apartment, Building, Street"
                />

                <Label for="delivery_instructions" className="mt-2">
                  Delivery Instructions (Optional)
                </Label>
                <textarea
                  name="delivery_instructions"
                  value={inputs.delivery_instructions}
                  onChange={(e) => onInputChange(e)}
                  placeholder="How should we deliver your food"
                />
              </CardBody>
            </Card>
            {
              //  </Collapse>
            }

            <h3 className="mt-4">Payment details</h3>
            <Row className="mt-2">
              <Col xl={4}>Dish charges</Col>
              <Col xl={8}>₹ {calculateTotalPrice()}</Col>
            </Row>
            <Row className="mt-2">
              <Col xl={4}>Delivery & Packaging charges</Col>
              <Col xl={8}>₹ 60</Col>
              <small className="text-muted">
                Delivery charges are based on distance from Kitchen
              </small>
            </Row>
            <Row className="mt-2">
              <Col xl={6}>0.7 KM</Col>
            </Row>

            <Row className="mt-2">
              <Col xl={4}>Tip</Col>
              <Col xl={8}>
                {" "}
                <Row className="mt-2">
                  <Col
                    xl={3}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <Button
                      className="btn p-2 a1 btn-sm btn-primary rounded-circle d-flex"
                      onClick={() => {
                        setTip((tip) => {
                          if (tip > 0) {
                            return tip - 5;
                          }
                          return 0;
                        });
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
                        remove
                      </span>
                    </Button>
                    {tip}
                    <Button
                      className="btn p-2 a1 btn-sm btn-primary rounded-circle d-flex"
                      onClick={() => {
                        setTip((tip) => tip + 5);
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
                </Row>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col xl={4}>Taxes</Col>
              <Col xl={8}>₹ 0.00</Col>
            </Row>
            <hr />
            <Row className="text-dark">
              <Col xl={4}>Total amount Payable : </Col>
              <Col xl={8} tag="h6">
                ₹ {totalPayableAmount}
              </Col>
            </Row>

            <Row className="text-dark">
              <Button
                className="btn btn-lg my-5 mx-2 btn-primary"
                type="submit"
                onClick={(e) => {
                  onOrderPlaceClicked();
                }}
              >
                Place order
              </Button>
            </Row>
          </Col>
          <Col xl={3}>
            {
              // <Cart />
            }
            <React.Fragment>
              <Card
                className="d-flex align-items-center justify-content-start flex-column"
                style={{ height: "78vh", overflowY: "scroll" }}
              >
                {checkOutItems.length === 0 ? (
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
                    {checkOutItems.map((dish) => {
                      return (
                        <ListGroupItem
                          style={{ width: "100%" }}
                          key={dish.d_id}
                        >
                          <Badge
                            color="primary"
                            className="bg-primary mx-1 rounded-pill"
                            pill
                          >
                            {dish.quantity}{" "}
                          </Badge>
                          {dish.dish_name}
                          <span className="mx-2">
                            {dish.price * dish.quantity}
                          </span>
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                )}
              </Card>

              {
                // <Button
                //   size="lg"
                //   style={{ width: "100%" }}
                //   onClick={() => {
                //     history.push("/checkout", {
                //       checkOutItems: cartItems,
                //     });
                //   }}
                //   className="btn btn-primary mt-1"
                // >
                //   Go to checkout{" "}
                //   <span className="mx-2 px-2 rounded-pill bg-white text-primary">
                //     ₹ {calculateTotalPrice()}{" "}
                //   </span>
                // </Button>
              }
            </React.Fragment>
          </Col>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Checkout;
