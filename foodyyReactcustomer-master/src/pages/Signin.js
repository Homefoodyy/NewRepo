import React, { useState } from "react";
import {  Button, Col, Container, Row } from "reactstrap";
import foodImage from "../assets/images/food-1.jpg";
import Footer from "../components/Footer";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/User/actions";
import api from "../helper/apiHelper";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { ToastContainer, toast } from "react-toastify";

const Signin = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const onInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const signinUser = () => {
    api
      .post("/auth/customer/signin", {
        email: inputs.email,
        password: inputs.password,
      })
      .then((res) => {
        if (res.data.token) {
          dispatch(addUser(inputs.email, res.data.token, true));

          history.push("/home");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Please check your credentials and Try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <React.Fragment>
      <Container fluid>
        <ResponsiveNavbar />
        <ToastContainer />
        <Container className="mt-5" style={{ width: "100%" }}>
          <Row>
            <Col xl={6} sm={12}>
              <h1 className="primaryFont">Welcome back</h1>

              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="my-3"
                placeholder="Email"
                required
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="my-3"
                placeholder="Password"
                required
                onChange={(e) => onInputChange(e)}
              />
              <br />
              <Button
                style={{ width: "100%" }}
                className="btn btn-primary mt-4 rounded-pill "
                onClick={() => signinUser()}
              >
                Sign in
              </Button>
              <p style={{ cursor: "pointer" }} className="mt-2">
                Not registered ?{" "}
                <strong
                  onClick={() => {
                    history.push("/signup");
                  }}
                >
                  Create an account
                </strong>
              </p>
            </Col>
            <Col xl={6} sm={12}>
              <img
                src={foodImage}
                style={{ height: "90%", objectFit: "contain" }}
                width="100%"
                alt=""
                srcset=""
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Signin;
