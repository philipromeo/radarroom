import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Card from "../../Shared/Components/UIElements/Card";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_NUMBER
} from "../../Shared/Util/Validators";
import { useForm } from "../../Shared/Hooks/form-hook";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import { AuthContext } from "../../Shared/Context/Auth-context";
import "./PlaceForm.css";

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      leaseTime: {
        value: "",
        isValid: false
      },
      price: {
        value: "",
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_ASSET_URL}api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },
            description: {
              value: responseData.place.description,
              isValid: true
            },
            leaseTime: {
              value: responseData.place.leaseTime,
              isValid: true
            },
            price: {
              value: responseData.place.price,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_ASSET_URL}api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value.toLowerCase(),
          description: formState.inputs.description.value.toLowerCase(),
          leaseTime: formState.inputs.leaseTime.value,
          price: formState.inputs.price.value
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
      history.push("/" + auth.userId + "/places");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Input
            id="leaseTime"
            element="number"
            label="Lease Time"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
            errorText="Please enter a valid lease time."
            onInput={inputHandler}
            initialValue={loadedPlace.leaseTime}
            initialValid={true}
          />
          <Input
            id="price"
            element="number"
            label="Price"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
            errorText="Please enter a valid price."
            onInput={inputHandler}
            initialValue={loadedPlace.price}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
