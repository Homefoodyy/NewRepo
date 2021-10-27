import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Badge, Button, Card, ListGroup, ListGroupItem } from "reactstrap";

const Cart = () => {
  const params = useParams();
  const cart = useSelector((state) => state.cartReducer);
  const history = useHistory();
  const [cartItems, setCartItems] = useState([]);

  const kitchenId = params.id;

  useEffect(() => {
    setCartItems(
      Array.from(new Set(cart)).filter((dish) => {
        return dish.k_id === kitchenId;
      })
    );
    console.log(cartItems);
  }, [cart, kitchenId]);

  const calculateTotalPrice = () => {
    let total = 0;
    Array.from(new Set(cartItems)).map((dish) => {
      total += dish.price * dish.quantity;
    });
    return total;
  };

  return (
    <React.Fragment>
      <Card
        className="d-flex align-items-center justify-content-start flex-column"
        style={{ height: "80vh", overflowY: "scroll" }}
      >
        {cartItems.length === 0 ? (
          <React.Fragment>
            <span className="material-icons mt-4" style={{ fontSize: "64px" }}>
              shopping_cart
            </span>
            <small className="mt-2 text-muted">
              Your cart is empty, Add items to get started
            </small>
          </React.Fragment>
        ) : (
          <ListGroup style={{ width: "100%" }}>
            {Array.from(new Set(cartItems)).map((dish) => {
              return (
                <ListGroupItem style={{ width: "100%" }} key={dish.d_id}>
                  <Badge
                    color="primary"
                    className="bg-primary mx-1 rounded-pill"
                    pill
                  >
                    {dish.quantity}{" "}
                  </Badge>
                  {dish.dish_name}
                  <span className="mx-2">{dish.price * dish.quantity}</span>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}
      </Card>
      <Button
        style={{ width: "100%" }}
        onClick={() => {
          history.push("/checkout");
        }}
        className="btn btn-primary mt-1"
      >
        Go to checkout{" "}
        <span className="mx-2 px-2 rounded-pill bg-white text-primary">
          ₹ {calculateTotalPrice()}{" "}
        </span>
      </Button>
    </React.Fragment>
  );
};

export default Cart;
