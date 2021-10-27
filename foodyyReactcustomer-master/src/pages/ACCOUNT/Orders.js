import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import AccountSidebar from "../../components/AccountSidebar";
import OrderCollapse from "../../components/OrderCollapse";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";
import api from "../../helper/apiHelper";
const Orders = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get(
          `/orders/customer/${localStorage.getItem("food-app-user-id")}`
        );
        if (res.status !== 200) {
          toast.error("Could not retrive orders", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        console.log("ORDER PAGE", res.data.data);
        setResult(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <Container fluid>
      <ResponsiveNavbar />
      <Row>
        <Col xl={3}>
          <AccountSidebar />
        </Col>
        <Col xl={9}>
          <h2>Orders</h2>
          {result.map((order) => (
            <OrderCollapse order={order} key={order.o_id} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Orders;
