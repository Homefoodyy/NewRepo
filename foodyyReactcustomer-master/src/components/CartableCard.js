import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import { addItemToCart, removeItemToCart } from "../redux/Cart/actions";

const CartableCard = ({ dish }) => {
  const [modal, setModal] = useState(false);

  console.log(dish)
  const dispatch = useDispatch();
  const Modaltoggle = () => setModal(!modal);
  const cartItems = useSelector((state) => state.cartReducer);

  const countQuantityInCart = (id) => {
    if (cartItems.length !== 0) {
      const retrivedDish = cartItems.find((dish) => {
        return dish.d_id === id;
      });
      return retrivedDish?.quantity || 0;
    }
  };

  return (
    <React.Fragment>
      <Col xl={4} xs={12} className="my-2">
        <Card>
          <div style={{ position: "relative" }}>
            <CardImg src={dish.dish_image} />
            <h6
              className="bg-light bg-body py-1 px-2 rounded-pill"
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                fontSize: "14px",
              }}
            >
              {dish.time_to_cook} Minutes
            </h6>
          </div>
          <CardBody>
            <CardTitle tag="h4">{dish.dish_name}</CardTitle>
            <CardText tag="p">Rs. {dish.price}</CardText>
            <CardText tag="small">{dish.description}</CardText>
          </CardBody>
          <CardFooter>
            <Row>
              <Col
                xl={6}
                className="d-flex justify-content-between align-items-center"
              >
                {countQuantityInCart(dish.d_id) > 0 ? (
                  <Button
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
                        fontSize: "12px",
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
                    className={`btn p-2 a1 btn-sm btn-primary rounded-circle d-flex`}
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
                )}
                {countQuantityInCart(dish.d_id)}
                <Button
                  className="btn p-2 a1 btn-sm btn-primary rounded-circle d-flex"
                  onClick={() => {
                    dispatch(
                      addItemToCart({
                        dish_name: dish.dish_name,
                        price: dish.price,
                        d_id: dish.d_id,
                        quantity: 1,
                        k_id: dish.k_uid,
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
              <Col xl={6}>
                <Button
                  onClick={Modaltoggle}
                  className="btn-outline btn-light my-2"
                >
                  Learn more
                </Button>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </Col>

      <Modal scrollable isOpen={modal} toggle={Modaltoggle}>
        <CardImg src={dish.dish_image} />

        <ModalBody>
          <h4>{dish.dish_name}</h4>
          <h6>About this dish</h6>
          {dish.description}
          <br />
          <h6 className="mt-2">Ingredients</h6>
          {dish.ingredients}
        </ModalBody>
        <ModalFooter>
          <Row style={{ width: "100%" }}>
            <Col
              xl={6}
              className="d-flex justify-content-between align-items-center"
            >
              {countQuantityInCart(dish.d_id) > 0 ? (
                <Button
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
                    class="material-icons"
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
              ) : (
                <Button
                  disabled
                  className={`btn p-2 a1 btn-sm btn-primary rounded-circle d-flex`}
                >
                  <span
                    class="material-icons"
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
              )}
              {countQuantityInCart(dish.d_id)}
              <Button
                className="btn p-2 a1 btn-sm btn-primary rounded-circle d-flex"
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
            <Col xl={6} className="d-flex justify-content-end">
              <Button
                className="btn-outline btn btn-primary my-2"
                onClick={() => {
                  Modaltoggle();
                  dispatch(
                    addItemToCart({
                      dish_name: dish.dish_name,
                      price: dish.price,
                      d_id: dish.d_id,
                      quantity: 1,
                      k_id: dish.k_uid,
                    })
                  );
                }}
              >
                Add to cart - Rs. {dish.price}
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default CartableCard;
