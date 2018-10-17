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
      successCallback(response.data);
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
      successCallback(response.data);
    })
    .catch(error => {
      errorCallback(error);
    });
}

// Get user with the given id
export function getUser(id, successCallback, errorCallback) {
  // api
  //   .get("/users/", {
  //     params: {
  //       id: id
  //     }
  //   })
  //   .then(response => {
  //     successCallback(response);
  //   })
  //   .catch(error => {
  //     errorCallback(error);
  //   });

  api
    .get("/users")
    .then(response => {
      successCallback(response.data[0]);
    })
    .catch(error => {
      errorCallback(error);
    });
}

// Get professor with the given id
export function getProfessor(id, successCallback, errorCallback) {
  // api
  //   .get("/professor/", {
  //     params: {
  //       id: id
  //     }
  //   })
  //   .then(response => {
  //     successCallback(response);
  //   })
  //   .catch(error => {
  //     errorCallback(error);
  //   });
  api
    .get("/professor/" + id)
    .then(response => {
      successCallback(response.data);
    })
    .catch(error => {
      errorCallback(error);
    });
}
