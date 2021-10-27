import React, { useState } from "react";
import {
  FormGroup,
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
} from "reactstrap";

import foodImage from "../assets/images/food-1.jpg";
import Footer from "../components/Footer";
import { useHistory } from "react-router";
import api from "../helper/apiHelper";
import { useDispatch } from "react-redux";
import { addUser, addZipCode } from "../redux/User/actions";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { toast } from "react-toastify";

const Signup = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    zip_code:""
  });

  const dispatch = useDispatch();

  const onInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post("/auth/customer/signup", inputs);
      
      console.log(result.data, 12313132)
      
      if ( result && result.data.token) {
        console.log(result.data);
        dispatch(
          addZipCode(result.data.zip_code),
          addUser(inputs.email, result.data.token, true, result.data.zip_code)
        );
        history.push("/home");
      }
      
    } catch (err) {
      const error = (err.message === "Request failed with status code 401")
      ? "email already Registred, Please use another one": "Could not not create account, Please check the network"

      toast.error(error , {
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
    <React.Fragment>
      <Container>
        <ResponsiveNavbar />
        <Container className="mt-5" style={{ width: "100%" }}>
          <Row>
            <Col xl={6} sm={12}>
              <h1 className="primaryFont">Sign up</h1>
              
              <Form>
                <FormGroup>
                  <label htmlFor="fname">First name</label>
                  <input
                    type="text"
                    name="fname"
                    className="my-3"
                    placeholder="ex. john"
                    required
                    onChange={(event) => onInputChange(event)}
                  />
                  <label htmlFor="lname">Last name</label>
                  <input
                    type="text"
                    name="lname"
                    className="my-3"
                    placeholder="ex. does"
                    required
                    onChange={(event) => onInputChange(event)}
                  />
                  <label htmlFor="zip_code">Area zipcode</label>
                  <input
                    type="text"
                    name="zip_code"
                    className="my-3"
                    placeholder="ex. 385565"
                    required
                    onChange={(event) => onInputChange(event)}
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="my-3"
                    placeholder="ex. yourname@email.com"
                    required
                    onChange={(event) => onInputChange(event)}
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="my-3"
                    placeholder="************"
                    required
                    onChange={(event) => onInputChange(event)}
                  />

                  <br />
                  <Button
                    type="submit"
                    style={{ width: "100%" }}
                    className="btn btn-primary  rounded-pill "
                    onClick={(e) => signupUser(e)}
                  >
                    Sign up
                  </Button>
                </FormGroup>
              </Form>
              <p style={{ cursor: "pointer" }} className="mt-2">
                Already have an account ?
                <strong
                  onClick={() => {
                    history.push("/signin");
                  }}
                >
                  {" "}
                  Login
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

export default Signup;
