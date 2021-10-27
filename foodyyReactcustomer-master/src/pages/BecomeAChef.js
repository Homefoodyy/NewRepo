import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "reactstrap";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import BackgroundImage from "../assets/images/food-4.jpg";
import Footer from "../components/Footer";
import api from "../helper/apiHelper";
import { ToastContainer, toast } from "react-toastify";

const BecomeAChef = () => {
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
          <h1 className="text-white">Earn money doing what you love</h1>
          <h3 className="text-white mt-3">
            Sign up to be your own boss and <br /> cook whenever you want.
          </h3>
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
                <h5>Create your profile</h5>
              </li>
              <li>
                <h5>List your menu</h5>
              </li>
              <li>
                <h5>Start getting orders</h5>
              </li>
            </ul>
          </Col>
          <Col xl={6} sm="12" className="place-center">
            <h3 className="mb-4 primaryFont">How do you benifit ?</h3>
            <ul>
              <li>
                <h5>Get countless consumers.</h5>
              </li>
              <li>
                <h5>Manage business professionally.</h5>
              </li>
              <li>
                <h5>Create your identity.</h5>
              </li>
              <li>
                <h5>Earn from home</h5>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Container className="p-4">
        <Row>
          <Col xl="6" sm="12" className="mt-2">
            <h3 className="mb-4 primaryFont">Verification via visit</h3>
            <ul>
              <li>
                <p>
                  Our promise to consumer is trusted and home chefs. Our team
                  visits every Home chefs house to check for hygiene and food
                  quality. They will be happy to share opportunity in person.
                </p>
              </li>
            </ul>
          </Col>
          <Col xl={6} sm="12" className="place-center">
            <h3 className="mb-4 primaryFont">Selection criteria</h3>
            <ul>
              <li>
                <h5>A home chef who actively engage.</h5>
              </li>
              <li>
                <h5>Chef house and Kitchen should be clean and hygienic</h5>
              </li>
              <li>
                <h5>
                  A chef who is passionate about cooking and makes good quality
                  food
                </h5>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
};

export default BecomeAChef;
