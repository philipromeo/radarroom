import React, { useReducer, useEffect } from "react";

import { validate } from "../../Util/Validators";
import "./RangeSlider.css";

const InputReducer = (state, action) => {
    switch (action.type) {
      case "change":
        return {
          ...state,
          value: action.val,
          isValid: validate(action.val, action.validators)
        };
      case "touch": {
        return {
          ...state,
          isTouched: true
        };
      }
      default:
        return state;
    }
  };
  

const RangeSlider = props => {
  const [inputState, dispatch] = useReducer(InputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: "change",
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "touch"
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={"range"}
        min={props.min}
        max={props.max}
        className={`w-100 appearance-none bg-transparent range-slider-thumb-custom`}

        step={props.step}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

    return (
      <div className="mb4">
        <label htmlFor={props.id} className="f4 mt0">
         <b className="fw7 pl1">{props.label}{value}</b>
        </label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
      </div>
    );
  }


export default RangeSlider;
