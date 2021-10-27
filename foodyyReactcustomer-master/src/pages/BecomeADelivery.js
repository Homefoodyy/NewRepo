import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "reactstrap";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import BackgroundImage from "../assets/images/food-4.jpg";
import Footer from "../components/Footer";
import api from "../helper/apiHelper";
import { ToastContainer, toast } from "react-toastify";

const BecomeADelivery = () => {
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    address: "",
  });

  const onInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post("/chef/request", inputs);
      console.log(result);

      toast.success("Requested, We will contact you soon.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setInputs({ name: "", city: "", address: "", phone: "", state: "" });
    } catch (err) {
      console.log(err);

      toast.error("Failed, Please enter all valid data.", {
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

  return (
    <Container fluid>
      <ResponsiveNavbar />
      <ToastContainer />
      <Row
        style={{
          background: `url(${BackgroundImage})`,
          backgroundPosition: "center",
          height: "85%",
        }}
      >
        <Col xl={8} md={8} className="mt-5">
          <h1 className="text-white">Be your own boss</h1>
          <h3 className="text-white mt-3">Earn money on your own terms.</h3>
          <Form method="POST" onSubmit={onSubmit}>
            <Row className="mt-5">
              <Col xl={6}>
                <input
                  onChange={(event) => onInputChange(event)}
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
                <input
                  type="text"
                  onChange={(event) => onInputChange(event)}
                  name="city"
                  className="mt-2"
                  placeholder="City"
                  required
                />
                <textarea
                  onChange={(event) => onInputChange(event)}
                  className="mt-2"
                  name="address"
                  placeholder="Address"
                  rows="4"
                  required
                />
              </Col>
              <Col xl={6}>
                <input
                  onChange={(event) => onInputChange(event)}
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  required
                />
                <input
                  type="text"
                  onChange={(event) => onInputChange(event)}
                  name="state"
                  className="mt-2"
                  placeholder="State"
                  required
                />
                <Button
                  type="submit"
                  style={{ width: "100%" }}
                  className="btn my-5 btn-primary btn-lg rounded-pill "
                >
                  Get started
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <Container className="p-4">
        <Row>
          <Col xl="6" sm="12" className="mt-2">
            <h3 className="mb-4 primaryFont">How it works ?</h3>
            <ul>
              <li>
                <h5>Contact us</h5>
              </li>
              <li>
                <h5>We will reach you out</h5>
              </li>
              <li>
                <h5>Start working</h5>
              </li>
            </ul>
          </Col>
          <Col xl={6} sm="12" className="place-center">
            <h3 className="mb-4 primaryFont">How do you benifit ?</h3>
            <ul>
              <li>
                <h5>Whole delivery charge goes to your pocket</h5>
              </li>
              <li>
                <h5>Be your own boss with flexibility</h5>
                <p>You can choose the area you want to work, date and time</p>
              </li>
              <li>
                <h5>Earn 30,000 to 50,000</h5>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
};

export default BecomeADelivery;
