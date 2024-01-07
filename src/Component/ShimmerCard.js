import React from "react";
import { Card } from "react-bootstrap";

const ShimmerCard = () => {
  return (
    <Card
      border="light"
      className="w-100 mx-auto pt-3 pb-4 px-4"
      style={{ maxWidth: 280 }}
    >
      <Card.Body className="d-flex justify-content-between flex-column">
        <Card.Title style={{ height: "50px" }}></Card.Title>
        <Card.Text
          style={{ height: "150px", backgroundColor: "#eee" }}
        ></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ShimmerCard;
