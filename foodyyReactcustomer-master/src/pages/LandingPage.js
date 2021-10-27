import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
import Footer from "../components/Footer";

import PhoneImg from "../assets/images/phone-landing.jpeg";
import { useDispatch } from "react-redux";
import { addZipCode } from "../redux/User/actions";
import { useHistory } from "react-router";
import ResponsiveNavbar from "../components/ResponsiveNavbar";

const LandingPage = () => {
  const [input, setInput] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Container fluid>
        <ResponsiveNavbar />
        <Row
          className="p-3"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/photos/closeup-of-young-female-hands-chopping-fresh-vegetables-on-chopping-picture-id1219944808?b=1&k=20&m=1219944808&s=170667a&w=0&h=lZvZgor6Xg5cfCuC9197K06BqcAYfbQgG-nej28cO6k=')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: "60vh",
          }}
        >
          <Col xl={5} sm={12}>
            <h1 className="text-white">
              Authentic dishes. <br /> Homemade. <br /> Delivered.
            </h1>
            <h3 className="text-white">
              Explore who is cooking in your neighbourhood
            </h3>
            <InputGroup className="mt-4">
              <Input
                placeholder="Enter your zip code"
                className="rounded-pill px-3"
                onChange={(event) => setInput(event.target.value)}
                value={input}
              />
              <InputGroupAddon addonType="append">
                <Button
                  onClick={() => {
                    dispatch(addZipCode(input));
                    history.push("/home");
                  }}
                  className="btn btn-primary rounded-pill p-2"
                >
                  Find food
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <Col xl={6} sm={12}></Col>
        </Row>
      </Container>
      <Container className="p-4">
        <Row>
          <Col xl="6" sm="12" className="place-center">
            <h3 className="mb-4">Explore Home Food</h3>
            <ul>
              <li>
                <h5>Made by Home Chef</h5>
              </li>
              <li>
                <h5>Taste Authentic Flavours of India</h5>
              </li>
              <li>
                <h5>Freshly Prepared Always</h5>
              </li>
              <li>
                <h5>Cleanliness & Hygiene Guaranteed</h5>
              </li>
              <li>
                <h5>Highest rating by consumers</h5>
              </li>
            </ul>
          </Col>
          <Col xl={6} className="place-center">
            <img
              width="100%"
              src={PhoneImg}
              style={{ height: "500px", objectFit: "contain" }}
              alt="phone"
            />
          </Col>
        </Row>
      </Container>

      <Container className="p-4">
        <Row>
          <Col xl="6" sm="12" className="place-center">
            <h3 className="mb-4">Riders delivery guidelines</h3>
            <ul>
              <li>
                <h5>SANITIZATION STANDARDS</h5>
                <p>
                  All Delivery Riders have been trained to maintained high
                  cleanliness standards and they carry o Kit of Mask Hand
                  Sanitizer, Cloves and Thermometer
                </p>
              </li>
              <li>
                <h5>CONTACTLESS DELIVERY</h5>
                <p>
                  Every Food Package is picked up and delivered without any
                  contact with the lime Cher and Customer. We follow a
                  Contacdless delivery Policy.
                </p>
              </li>
              <li>
                <h5>RIDER SUPERVISION</h5>
                <p>
                  All the Delivery orders are supervised daily for their
                  temperature readings and conformity to Wearing a Musk, Hygiene
                  and social distancing norms.
                </p>
              </li>
            </ul>
          </Col>
          <Col xl={6} sm="12" className="place-center">
            <h3 className="mb-4">Home chefs cooking guidelines</h3>
            <ul>
              <li>
                <h5>CLEANING & SANITIZATION</h5>
                <p>
                  Every Home chef ensures that hands are washed regularly every
                  15 minutes and their Home Kitchen is cleaned and sanitized 2
                  times daily.
                </p>
              </li>
              <li>
                <h5>MASK & SOCIAL DISTANCING</h5>
                <p>
                  All the Home Chers usually don’t move of their homes. They
                  wear a mask and maintain social distancing of 8 Feet. if they
                  meet anyone.
                </p>
              </li>
              <li>
                <h5>HEATHY & FRESHLY PREPARED</h5>
                <p>
                  Food is freshly prepared by some chefs when they get an order.
                  All the ingredients used are Fresh and Top quality to ensure
                  the food served is Healthy.
                </p>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <Container className="p-4">
        <Row>
          <Col xl="6" sm="12" className="place-center">
            <h3 className="mb-4">Food culture of India</h3>
            <ul>
              <li>
                <p>
                  Explore & experience authentic and traditional food coming
                  from different cultures of India and the globe. Made by the
                  finest home chefs in their home kitchens, every dish reises
                  the bar of taste, health, hygiene, and cleanliness. Made with
                  pure teapot and fresh ingredients. every man will make a story
                  to relish and remember!!! We offer a variety of cuisines from
                  across the food culture of India on your mobile phone.
                  downloaded our food delivery app to relish traditional
                  cuisines prepared with love by home Chefs who have a passion
                  to cook Celebrate the food festival of India every day. Eat:
                  healthy. Live healthily.
                </p>
              </li>
            </ul>
          </Col>
          <Col xl={6} sm="12" className="place-center">
            <h3 className="mb-4">MOST TRUSTED FOOD: HOME FOOD</h3>
            <ul>
              <li>
                <h5>VARIETY & TASTE</h5>
                <p>
                  Every chef represents mastery over cuisines from their own
                  culture. Explore the authentic taste of various food cultures
                  from across the Country
                </p>
              </li>
              <li>
                <h5>FRESH & HEALTHY</h5>
                <p>
                  Home food is made with pure ingredients without the use of
                  preservatives or roused as Homa chefs cook and serve what they
                  make for their family and loved ones.
                </p>
              </li>
              <li>
                <h5>CLEAN & HYGIENIC</h5>
                <p>
                  Kitchens are the cleanness and most timely part of any home
                  every home chef follows the highest standards of hygiene and
                  cleanliness like clean utensils, Cleon wipes, clean cutlery,
                  washed vegetable exhaust and pest control
                </p>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default LandingPage;
