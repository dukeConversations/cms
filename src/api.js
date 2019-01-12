var axios = require("axios");

// Instantiate an axios client
const api = axios.create({
  baseURL: `https://dukeconvo.herokuapp.com/`
});

// Login a user with the given credentials
exports.login = function(username, password, successCallback, errorCallback) {
  let loginCredentials = { username: username, password: password };

  api
    .post("login", loginCredentials)
    .then(response => {
      successCallback(response.data);
    })
    .catch(error => {
      console.log(error);
      errorCallback(error);
    });
};

// Get info on the currently logged in user
exports.getUserInfo = function(successCallback, errorCallback) {
  api
    .get("userinfo")
    .then(response => {
      successCallback(response.data);
    })
    .catch(error => {
      errorCallback(error);
    });
};

// Logout current user
exports.logout = function(successCallback, errorCallback) {
  api
    .get("logout")
    .then(response => {
      successCallback(response.data);
    })
    .catch(error => {
      errorCallback(error);
    });
};
