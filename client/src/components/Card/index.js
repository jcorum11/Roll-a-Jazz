import React from "react";
import { Card } from "react-bootstrap";
import QrCode from "../QrCode";
import { useDispatch, useReducer } from "react-redux";

import DeleteCard from '../DeleteCard'
import RemoveCard from '../RemoveCard'
import CardList from "../CardList";

const CardComponent = ({ cards }) => {

  console.log(window.location.pathname);

  // const DeleteButton = () => {
  //   if(window.location.pathname === '/') {
  //     return <DeleteCard/>
  //   }
  //   if (window.location.pathname === '/collection') {
  //     return <RemoveCard/>
  //   } else {
  //   }
  // }

  // const CardComponent = ({ card }) => {
  //   const viewHandler = () => {
  //     window.location.href = "/single-card";
  //   };
  // }

  return (
    <div>
      <Card className="border m-1" key={cards._id} style={{ minHeight: "50vh" }}>
        <Card.Body>
          <Card.Title>{cards.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {cards.companyName}
          </Card.Subtitle>
          <Card.Link href={cards.website} target="_blank">
            {cards.website}
          </Card.Link>
          <Card.Text>{cards.tagline}</Card.Text>
          <h5>Contact</h5>
          <Card.Link href={"mailto:" + cards.email}>{cards.email}</Card.Link>
          <br />
          <Card.Link href={"tel:+" + cards.phone}>{cards.phone}</Card.Link>
          <QrCode cardId={cards._id} />
        </Card.Body>
        <DeleteCard/>
      </Card>
    </div>
  );
};

export default CardComponent;
