import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";
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

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      address: {
        value: "",
        isValid: false
      },
      image: {
        value: null,
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

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value.toLowerCase());
      formData.append("description", formState.inputs.description.value.toLowerCase());
      formData.append("address", formState.inputs.address.value.toLowerCase());
      formData.append("image", formState.inputs.image.value);
      formData.append("leaseTime", formState.inputs.leaseTime.value);
      formData.append("price", formState.inputs.price.value);
      await sendRequest("http://localhost:5000/api/places", "POST", formData, {
        Authorization: "Bearer " + auth.token
      });
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Input
          id="leaseTime"
          element="input"
          type="number"
          label="Specify month minimum lease"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
          errorText="Please enter a valid period."
          onInput={inputHandler}
        />
        <Input
          id="price"
          element="input"
          type="number"
          label="Price"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
          errorText="Please enter a valid price."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
