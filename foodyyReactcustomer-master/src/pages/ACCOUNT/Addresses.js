import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import AccountSidebar from "../../components/AccountSidebar";
import api from "../../helper/apiHelper";
import { toast } from "react-toastify";

const Addresses = () => {
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    street_address: "",
    address_line: "",
  });
  const [result, setResult] = useState({
    address_line: "",
    c_id: 0,
    email: "",
    fname: "",
    lname: "",
    password: "",
    phone: null,
    street_address: "",
  });

  useEffect(() => {
    const retriveData = async () => {
      try {
        const result = await api.get(
          `/customers/${localStorage.getItem("food-app-user-id")}`
        );
        setResult(result.data.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    retriveData();
  }, [inputs]);

  const onInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmitButtonClicked = () => {
    const retriveData = async () => {
      try {
        await api.put(
          `/customers/${localStorage.getItem("food-app-user-id")}`,
          {
            street_address: inputs.street_address,
            address_line: inputs.address_line,
          }
        );

        setInputs({ street_address: "", address_line: "" });
        toast.success("Your name has beed updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (inputs.address_line === "" || inputs.street_address === "") {
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      retriveData();
    }
  };

  return (
    <Container fluid>
      <ResponsiveNavbar />
      <Row>
        <Col xl={3}>
          <AccountSidebar />
        </Col>
        <Col xl={9}>
          <h2>Your address</h2>
          <Card>
            <CardBody>
              <Row>
                <Col xl={6}>
                  <Label for="name" className="mt-2">
                    Name
                  </Label>
                  <Input
                    disabled
                    type="text"
                    // onChange={(e) => onInputChange(e)}
                    value={result.fname + " " + result.lname}
                    name="name"
                    placeholder="Name"
                  />
                </Col>
                <Col xl={6}>
                  <Label for="phone" className="mt-2">
                    Phone
                  </Label>
                  <Input
                    disabled
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
                placeholder={result.street_address}
              />
              <Label for="address_line_2" className="mt-2">
                Address Line 2
              </Label>
              <input
                type="text"
                name="address_line"
                onChange={(e) => onInputChange(e)}
                value={inputs.address_line}
                placeholder={result.address_line}
              />
            </CardBody>
          </Card>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              size="lg"
              style={{ width: "95%" }}
              className="m-2 btn-primary rounded-pill"
              onClick={onSubmitButtonClicked}
            >
              Save changes
            </Button>
          </Row>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default Addresses;
