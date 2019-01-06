var axios = require("axios");

// Instantiate an axios client
const api = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/https://dukeconvo.herokuapp.com/`
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

// Get dinners for the given user and status
exports.getDinnersForUserAndStatus = function(
  userID,
  status,
  successCallback,
  errorCallback
) {
  api
    .get("dinner/selective", { id: userID, status: status })
    .then(response => {
      successCallback(response.data);
    })
    .catch(error => {
      errorCallback(error);
    });
};

// Get dinners for the given users
exports.getDinnersForUser = function(userID, successCallback, errorCallback) {
  api
    .get("dinner/selective", { id: userID })
    .then(response => {
      successCallback(response.data);
    })
    .catch(error => {
      errorCallback(error);
    });
};

// Get dinners with the given status
exports.getDinnersWithStatus = function(
  status,
  successCallback,
  errorCallback
) {
  api
    .get("dinner/selective", { status: status })
    .then(response => {
      successCallback(response.data);
    })
    .catch(error => {
      errorCallback(error);
    });
};
