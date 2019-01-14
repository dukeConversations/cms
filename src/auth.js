var Cookies = require("js-cookie");

exports.setLogin = function(loginResponse) {
  console.log(loginResponse);
  let user = {
    id: loginResponse.user.id,
    firstName: loginResponse.user.firstName,
    lastName: loginResponse.user.lastName,
    role: loginResponse.user.role
  };

  Cookies.set("token", loginResponse.access_token);
  Cookies.set("currentUser", JSON.stringify(user));
};

exports.isLoggedIn = function() {
  return (
    Cookies.get("token") !== undefined &&
    JSON.parse(Cookies.get("currentUser")) !== undefined
  );
};

exports.loggedInUser = function() {
  let user = Cookies.get("currentUser");
  return user === undefined ? null : JSON.parse(user);
};

exports.getCurrentUserToken = function(key) {
  let token = Cookies.get("token");
  return token === undefined ? null : token;
};

exports.logout = function() {
  Cookies.remove("token");
  Cookies.remove("currentUser");
};
