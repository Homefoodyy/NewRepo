import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import ResponsiveNavbar from "../../components/ResponsiveNavbar";
import Footer from "../../components/Footer";
import AccountSidebar from "../../components/AccountSidebar";
import api from "../../helper/apiHelper";
import { ToastContainer, toast } from "react-toastify";
const Account = () => {
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
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


  const onInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmitButtonClicked = () => {
    const retriveData = async () => {
      try {
        await api.put(
          `/customers/${localStorage.getItem("food-app-user-id")}`,
          {
            fname: inputs.fname,
            lname: inputs.lname,
          }
        );

        setInputs({ fname: "", lname: "" });
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

    if (inputs.fname === "" || inputs.lname === "") {
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

  return (
    <Container fluid>
      <ResponsiveNavbar />
      <ToastContainer />
      <Row>
        <Col xl={3}>
          <AccountSidebar />
        </Col>
        <Col xl={9}>
          <h2>Welcome {result.fname}</h2>
          <Form>
            <Row>
              <Col xl={6}>
                <Label>First name</Label>
                <Input
                  type="text"
                  placeholder={result.fname}
                  className="mb-2"
                  name="fname"
                  onChange={(e) => onInputChange(e)}
                  value={inputs.fname}
                />
                <Label>Email</Label>
                <Input
                  type="text"
                  disabled
                  style={{ cursor: "not-allowed" }}
                  placeholder={result.email}
                />
              </Col>
              <Col xl={6}>
                <Label>Last name</Label>
                <Input
                  type="text"
                  name="lname"
                  onChange={(e) => onInputChange(e)}
                  value={inputs.lname}
                  placeholder={result.lname}
                />
              </Col>
            </Row>
            <Row>
              <Col xl={3}>
                <FormGroup className="my-3">
                  <Label
                    htmlFor="exampleFile"
                    style={{
                      height: "230px",
                      border: "2px dashed white",
                      cursor: "pointer",
                      padding: "1rem",
                    }}
                    className="d-flex bg-primary align-items-center justify-content-center"
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h1 style={{ color: "white", fontSize: "4rem" }}>
                        {result.fname[0]}
                        {result.lname[0]}
                      </h1>
                    </div>
                    <input type="file" name="file" id="exampleFile" />
                  </Label>
                </FormGroup>
              </Col>
              <Col xl={6}></Col>
            </Row>
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
                className=" btn-primary rounded-pill"
                onClick={onSubmitButtonClicked}
              >
                Save changes
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default Account;
