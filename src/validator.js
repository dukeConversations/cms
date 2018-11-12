export default class Validator {
  constructor(o) {
    this.obj = JSON.parse(JSON.stringify(o));
    this.errorsDict = {};
  }

  propertyExists = field => {
    if (!this.obj.hasOwnProperty(field)) return false;

    let value = this.obj[field];

    if (toString.call(value) === "[object String]") {
      return value !== "";
    } else {
      return true;
    }
  };

  validate(field, required, rules = []) {
    if (!this.propertyExists(field)) {
      if (required) {
        this.errorsDict[field] = "This field is required.";
      }
    } else {
      var errors = [];

      let value = this.obj[field];

      rules.forEach(rule => {
        let error = rule(value);
        if (error !== null) {
          errors.push(error);
        }
      });

      if (errors.length !== 0) {
        this.errorsDict[field] = errors.join(" ");
      }
    }
  }
}
