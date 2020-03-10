import React from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Input from "../../Shared/Components/FormElements/Input";
import RangeSlider from "../../Shared/Components/FormElements/RangeSlider";
import Button from "../../Shared/Components/FormElements/Button";

import { VALIDATOR_TRUE } from "../../Shared/Util/Validators";
import { useForm } from "../../Shared/Hooks/form-hook";

import "./inputBar.css";

const InputBar = ({ inputsCallback }) => {
  const [formState, inputHandler] = useForm(
    {
      address: {
        value: "",
        isValid: false
      },
      price: {
        value: "",
        isValid: false
      },
      leaseTime: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const SearchSubmitHandler = async () => {
    inputsCallback(formState.inputs);
  };

  return (
    <React.Fragment>
      <div className="navbar-search-front">
        <Card className="search-container">
          <div className="input-filter-container">
            <form onSubmit={SearchSubmitHandler}>
              <Input
                id="address"
                element="input"
                type="text"
                label="Search for..."
                validators={[VALIDATOR_TRUE()]}
                errorText="Please enter a valid research item."
                onInput={inputHandler}
              />
              <div className="dropdown">
                <Button type="button" inverse>
                  Price
                </Button>
                <div className="dropdown-content">
                  <RangeSlider
                    id="price"
                    element="input"
                    type="range"
                    min="1"
                    max="1000"
                    value={"50"}
                    label={"Price max "}
                    validators={[VALIDATOR_TRUE()]}
                    errorText="Please enter a valid research item."
                    onInput={inputHandler}
                    step="1"
                  />
                </div>
              </div>

              <div className="dropdown">
                <Button type="button" inverse>
                  Period
                </Button>
                <div className="dropdown-content-guest">
                  <RangeSlider
                    id="leaseTime"
                    element="input"
                    type="range"
                    min="1"
                    max="6"
                    value={"1"}
                    label={"Month min "}
                    validators={[VALIDATOR_TRUE()]}
                    errorText="Please enter a valid research item."
                    onInput={inputHandler}
                    step="1"
                  />
                </div>
              </div>
            </form>
            <Button
              inverse
              type="submit"
              id="submitButton"
              onClick={SearchSubmitHandler}
            >
              Submit
            </Button>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default InputBar;
