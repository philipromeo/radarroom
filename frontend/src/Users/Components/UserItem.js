import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../Shared/Components/UIElements/Avatar";
import Card from "../../Shared/Components/UIElements/Card";
import "./UserItem.css";

const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            {/* <Avatar image={`${props.image}`} alt={props.name} /> */}
            <Avatar image={`${process.env.REACT_APP_BACKEND_ASSET_URL}/${props.image}`} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h3>{props.name}</h3>
            <h4>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h4>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
