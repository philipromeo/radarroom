import React from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/FormElements/Button";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";

import { useHttpClient } from "../../Shared/Hooks/http-hook";

const Element = props => {
  const { isLoading, error, clearError } = useHttpClient();

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_BACKEND_ASSET_URL}/${props.image}`}
              //src={props.image}
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
