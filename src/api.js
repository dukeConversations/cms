import axios from "axios";

// Instantiate an axios client
const api = axios.create({
  baseURL: `https://dukeconvo.herokuapp.com/`
});

// Get all professors
export function getProfessors(successCallback, errorCallback) {
  api
    .get("professors")
    .then(response => {
      console.log(response);
      successCallback(response);
    })
    .catch(error => {
      errorCallback(error);
    });
}

// Get all dinners
export function getDinners(successCallback, errorCallback) {
  api
    .get("dinners")
    .then(response => {
      successCallback(response);
    })
    .catch(error => {
      errorCallback(error);
    });
}

export function getUser(id, successCallback, errorCallback) {
  api
    .get("/users", {
      params: {
        id: id
      }
    })
    .then(response => {
      successCallback(response);
    })
    .catch(error => {
      errorCallback(error);
    });
}

export function getProfessor(id, successCallback, errorCallback) {
  api
    .get("/professors", {
      params: {
        id: id
      }
    })
    .then(response => {
      successCallback(response);
    })
    .catch(error => {
      errorCallback(error);
    });
}
