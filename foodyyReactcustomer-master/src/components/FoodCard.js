import React from "react";
import { useHistory } from "react-router";
import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";

const FoodCard = ({ id, kitchen }) => {
  const history = useHistory();
  return (
    <Col
      xl={4}
      md={6}
      xs={12}
      style={{ cursor: "pointer" }}
      onClick={() => {
        history.push(`kitchen-details/${id}`);
      }}
      className="m-2"
    >
      <Card className="shadow" style={{ borderRadius: "1rem" }}>
        <div
          className="foodcard_image-container"
          style={{ maxHeight: "14rem" }}
        >
          <CardImg
            src={kitchen.cover_photo}
            // height="14rem"
            width="14rem"
            style={{ width: "100%", height: "14rem", padding: "1rem" }}
          />
          <img
            src={kitchen.chefs_avatar}
            style={{
              position: "relative",
              top: "-80px",
              right: "12px",
              float: "right",
              borderRadius: "50%",
            }}
            height="100"
            width="100"
            alt="human-avatar"
          />
        </div>
        <CardBody>
          <CardTitle tag={"h4"}>{kitchen.name}</CardTitle>
          <Row>
            <Col xl={6} sm={6}>
              <h6>
                {kitchen.chef_name} | {kitchen.category}
              </h6>
            </Col>
          </Row>
          <Row>
            <Col
              xl={3}
              xs={3}
              className="d-flex justify-content-between align-items-center"
            >
              <span className="material-icons">store</span> {kitchen.kitchen_status}
            </Col>
            <Col xl={6} xs={3} className="d-flex justify-content-center ">
              <small className="text-muted fon">
                {kitchen.supports_takeaway === 1 ? "Takeaway " : ""}
                {kitchen.supports_delivery === 1 ? "| Delivery" : ""}
              </small>
            </Col>
            <Col xl={3} xs={3} className="d-flex justify-content-center">
              <span className="material-icons">location_on</span>
              <p>{kitchen.address_line}</p>
            </Col>
          </Row>
          <Row>
            <Col
              xl={6}
              xs={6}
              className="d-flex justify-content-between align-items-center mt-2"
            >
              {kitchen.open_time} - {kitchen.close_time}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FoodCard;
