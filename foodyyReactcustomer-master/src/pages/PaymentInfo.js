import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Button, Card, CardText, CardTitle, Container } from "reactstrap";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import api from "../helper/apiHelper";

const PaymentInfo = () => {
  const { id } = useParams();
  const [paymentInfo, setPaymentInfo] = useState({});

  const history = useHistory();
  useEffect(() => {
    const getPaymentInfo = async () => {
      try {
        const res = await api.get(`/payment/paymentInfo/${id}`);
        console.log(res);

        if (res.status !== 200) {
          return toast.error(
            "Could not complete the payment, Please try again",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
        setPaymentInfo(res.data.data);
      } catch (err) {
        toast.error("Could not retrive your payment information", {
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
    getPaymentInfo();
  }, [id]);
  return (
    <Container fluid style={{ height: "100vh" }}>
      <ResponsiveNavbar />
      <ToastContainer />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh", width: "32rem" }}
      >
        <Card body inverse color="primary" className="shadow">
          <CardTitle tag="h5">
            {paymentInfo ? "Payment successful" : "Payment unsuccessful"}
          </CardTitle>
          <CardText>
            {paymentInfo
              ? `You have paid ${paymentInfo.amount / 100} with
            ${paymentInfo.method}`
              : "Don't worry, Just try again"}
          </CardText>
          <Button
            onClick={() => {
              history.push("/home");
            }}
            className="btn-light bg-light text-white"
          >
            Go to home
          </Button>
        </Card>
      </Container>
    </Container>
  );
};

export default PaymentInfo;
