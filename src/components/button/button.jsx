import React from "react";
import "./button.css";

const Button = (props) => {

    return (
        <button
            id={props.id}
            className={props.className}
            onClick={props.onClick}
            to={props.to}
        >
        {props.value}
        </button>
    );
};

export default Button;