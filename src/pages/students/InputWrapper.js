import React from "react";

export default ({ children, inputId, inputName }) => (
  <div>
    <label htmlFor={inputId}>{inputName}</label>
    {children}
    <label
      className="errorLabel"
      htmlFor={inputId}
      hidden={!this.showError(inputId)}
    >
      {this.state.validationErrors[inputId]}
    </label>
  </div>
);
