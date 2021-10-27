import React from "react";
import { Col, Container, Row } from "reactstrap";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import FoodPhoto from "../assets/images/food-5.jpg";
import AmericanExpress from "../assets/cards/american-express.png";
import Footer from "../components/Footer";
const AboutUs = () => {
  return (
    <Container fluid>
      <ResponsiveNavbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          background: `url(${FoodPhoto})`,
          backgroundPosition: "center",
          height: "40vh",
          width: "100%",
        }}
      >
        <h1 className="text-white">About us</h1>
      </div>

      <div
        className="bg-secondary d-flex justify-content-center align-items-center"
        style={{
          padding: "4rem",
          background: "#f8f8f8",
          width: "100%",
        }}
      >
        <Container>
          <Row>
            <Col xl={3}>
              <img
                style={{
                  height: "8rem",
                  width: "100%",
                }}
                src={AmericanExpress}
                alt="american-express"
              />
            </Col>
            <Col
              xl={9}
              className="d-flex align-items-start flex-column justify-content-center"
            >
              <h2>OUR VISION</h2>
              <h6>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Delectus minus cum magnam.
              </h6>
            </Col>
          </Row>
          <Row>
            <Col xl={3}>
              <img
                src={AmericanExpress}
                alt="american-express"
                style={{
                  height: "8rem",
                  width: "100%",
                }}
              />
            </Col>
            <Col
              xl={9}
              className="d-flex align-items-start flex-column justify-content-center"
            >
              <h2>OUR MISSION</h2>
              <h6>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Delectus minus cum magnam.
              </h6>
            </Col>
          </Row>
          <Row>
            <Col xl={3}>
              <img
                src={AmericanExpress}
                style={{
                  height: "8rem",
                  width: "100%",
                }}
                alt="american-express"
              />
            </Col>
            <Col
              xl={9}
              className="d-flex align-items-start flex-column justify-content-center"
            >
              <h2>OUR VALUES</h2>
              <h6>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Delectus minus cum magnam.
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "50vh",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontFamily: "Ephesis",
            fontSize: "6vw",
            color: "rebeccapurple",
            textAlign: "center",
          }}
        >
          To build <br />
          women entrepreneur
        </h1>
      </div>

      <Container
        className="d-flex justify-content-center align-items-start flex-column"
        style={{
          width: "100%",
          padding: "4rem",
          marginBottom: "4rem",
        }}
      >
        <h3>About us</h3>
        <p>
          HomeShef is World's 1st Mobile Application for Home Food made by
          Genuine Home Chefs. HomeShef was started to Create India's Largest
          self-employment opportunity for women to earn from home being a Home
          Chef. Food is life and we are committed to Create a Fit & Healthy
          India by offering Healthy & Hygienic Home Cooked Food.
        </p>
        <p>
          At Homeshef, we're bringing the sharing economy to the table. We
          believe in providing our Shefs (refugees, immigrants, stay-at-home
          parents) the opportunity to make a meaningful income from their very
          own kitchens. We also believe that every person should have access to
          a healthy, homemade meal at an affordable price. Building a safe and
          happy community devoted to economic empowerment and cultural
          inclusivity -- that's why we started Shef.
        </p>
        <p>
          We are reviving the Culture of Home Food by offering people a variety
          of Traditional cuisines from every state of India. HomeShef is
          enabling Localized Home Food Experiences by delivering a Delicious
          variety of Authentic cuisines cooked by Talented Home Chefs. Home
          Chefs have learned the art of cooking through their unwavering passion
          and coached by their mother and grandmother to sprinkle love in food.
          HomeShef is very selective and responsible in selecting Home Chefs. As
          a Company Policy, our Chef Enrolment team visits every aspiring Home
          chef to check for Kitchen hygiene and cleanliness, Food Quality and
          Packaging standards. Our Team of Food Tasting Experts Upholds our
          unwavering Customer Promise to serve Delicious and Healthy Food. We
          are proud that 100% of our Home Chefs are FSSAI Registered. We enter
          into an agreement with Home Chefs after they qualify for all the
          Standards of on boarding so that our commitment to Users about Food
          Quality, Health & Hygiene standards is always valued. We are Obsessed
          about Food Quality and as a policy every we call up every Customer to
          seek their Feedback on Food Delivered. As a practice, Our Home Chefs
          call up all customers to seek their taste preferences before cooking
          the Food. Our Chefs come from all parts of the country and serve their
          unique traditional cuisines. From Bengali Food to Gujrati Food,
          Rajasthani Food to Maharashtrian Footman Food to Andhra food, Kashmiri
          Food to Assamese Food, we serve the most Authentic Food Homewood the
          Traditional Food Culture of India. Food is cooked only when an Order
          is booked. We Stand for Fresh, Delicious and Healthy Food made in
          Hygienic Home Kitchens. Celebrate Home Food Every day and Explore the
          Food Culture of India. We feel Humbled that we are enabling Homemakers
          to contribute towards Nation Building and overjoyed with our Purpose -
          "Ghar Ki Lakshmi Bani Bharat ki Lakshmi" We wish everyone a Healthy
          Life. Eat Healthy Home Food and Stay Fit. With Gratitude, Team
          HomeShef
        </p>
      </Container>
      <Footer />
    </Container>
  );
};

export default AboutUs;
