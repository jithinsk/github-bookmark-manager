import React from "react";
import { Card } from "react-bootstrap";

const WrapperUI = ({ heading, children }) => (
  <Card className="text-center">
    <Card.Header>
      <h3>{heading}</h3>
    </Card.Header>
    <Card.Body>{children}</Card.Body>
    <Card.Footer></Card.Footer>
  </Card>
);

export default WrapperUI;
