export function isNumber(value) {
  if (!isNaN(parseFloat(value)) && isFinite(value)) return null;
  return "Not a number";
}

export function isPhoneNumber(value) {
  var phoneExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gim;
  return phoneExp.test(value) ? null : "Not a valid phone number";
}

export function isEmail(value) {
  var emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailExp.test(value) ? null : "Not a valid email";
}
