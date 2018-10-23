import * as Rules from "./rules";

export default class Validator {
  constructor(o) {
    this.obj = o;
    this.errorsDict = {};
  }

  propertyExists = field => {
    if (!this.obj.hasOwnProperty(field)) return false;

    let value = this.obj[field];

    if (toString.call(value) == "[object String]") {
      return value !== "";
    }
  };

  validate(field, required, rules) {
    var errors = [];

    if (!this.propertyExists(field)) {
      if (required) {
        this.errorsDict[field] = "This field is required.";
      }
    }

    let value = this.obj[field];

    rules.forEach(rule => {
      let error = rule(value);
      if (error !== null) {
        errors.push(error);
      }
    });

    if (errors.length != 0) {
      this.errorsDict[field] = errors.join(" ");
    }
  }
}
