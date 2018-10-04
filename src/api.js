import axios from "axios";

// Instantiate an axios client
const api = axios.create({
  baseURL: `https://swapi.co/api/`
});

// Get all professors
export function getProfessors(successCallback, errorCallback) {
  api
    .get("people")
    .then(response => {
      const professors = response.data.results;
      successCallback(professors);
    })
    .catch(error => {
      errorCallback(error);
    });
}
