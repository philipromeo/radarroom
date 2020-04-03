import React from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Element from "./Element";
import "./Element_list.css";

const ElementList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list left">
        <Card>
          <h2>No places found! Please check later.</h2>
        </Card>
      </div>
    );
  } else {
    return (
      <ul className="place-list">
        {props.items.map(element => (
          <Element
            key={element.id}
            id={element.id}
            image={element.image}
            title={element.title}
            description={element.description}
            address={element.address}
            leaseTime={element.leaseTime}
            price={element.price}
            creatorId={element.creator}
            coordinates={element.location}
          />
        ))}
      </ul>
    );
  }
};

export default ElementList;
