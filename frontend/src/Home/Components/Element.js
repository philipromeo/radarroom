// import React, { useState } from "react";
import React from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/FormElements/Button";
// import Modal from "../../Shared/Components/UIElements/Modal";
// import Map from "../../Shared/Components/UIElements/Map";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";

import { useHttpClient } from "../../Shared/Hooks/http-hook";

const Element = props => {
  const { isLoading, error, clearError } = useHttpClient();

  // const [showMap, setShowMap] = useState(false);

  // const closeMapHandler = () => setShowMap(false);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {/* <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
       */}
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>
              {props.address}
              <span role="img" aria-labelledby="Pin Location">
                📍
              </span>
            </h3>
            <p>{props.description}</p>
            <p>
              <b>Month minimum lease: </b> {props.leaseTime}
            </p>
            <p>
              <b>Price per month: </b> £{props.price}
            </p>
          </div>
          <div className="place-item__actions">
            <Button>Book</Button> <Button inverse>Contact</Button>
            <Button inverse>Refer to a friend</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default Element;
