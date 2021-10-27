import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Collapse,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import api from "../helper/apiHelper";

const OrderCollapse = ({ order }) => {
  const [dish, setDish] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // const orderDate = new Date(JSON.parse(order.date));
  const payableAmount = JSON.parse(order.payable_amount);
  useEffect(() => {
    const dishInfo = JSON.parse(order.dishes);
    let tempState = [];
    dishInfo.map((o) => {
      return api
        .get(`/dishes/${o.d_id}`)
        .then((res) => {
          const { quantity } = o;
          tempState.push({ ...res.data.data[0], quantity });
        })
        .catch((err) => {
          console.error(err);
        });
    });
    setDish(tempState);
  }, [order]);

  return (
    <Card className="p-2 my-2">
      <div
        style={{ cursor: "pointer" }}
        className="d-flex justify-content-between"
        onClick={toggle}
      >
        <h4>
          Your order of ₹ {payableAmount} from {dish[0]?.kitchen_name}
          <h6 className="text-muted">Tap here to get more info</h6>
        </h4>
        <span class="material-icons"></span>
      </div>
      <Collapse isOpen={isOpen}>
        <CardBody>
          {dish.map((d) => {
            return (
              <ListGroupItem>
                <ListGroupItemHeading>
                  {d.dish_name} ({d.quantity})
                </ListGroupItemHeading>

                <ListGroupItemText>{d.description}</ListGroupItemText>
              </ListGroupItem>
            );
          })}
        </CardBody>
      </Collapse>
    </Card>
  );
};

export default OrderCollapse;
