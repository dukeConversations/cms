import axios from "axios";

// Instantiate an axios client
const api = axios.create({
  baseURL: `https://dukeconvo.herokuapp.com/`
});

// *************************
//         Dinners
// *************************

// Get all dinners
export function getDinners(successCallback, errorCallback) {
  api
    .get("dinners")
    .then(response => {
      console.log(response);
      successCallback(response.data);
    })
    .catch(error => {
      errorCallback(error);
    });
}
// Get dinner with given id
export function getDinner(id, successCallback, errorCallback) {
  api
    .get("/dinner/" + id)
    .then(response => {
      successCallback(response.data);
    })
    .catch(error => {
      errorCallback(error);
    });
}
// *************************
//         Professors
// *************************

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
// Get professor with the given id
export function getProfessor(id, successCallback, errorCallback) {
  api
    .get("/professors/" + id)
    .then(response => {
      console.log(response.data);
      successCallback(response.data);
    })
    .catch(error => {
      errorCallback(error);
    });
}

// *************************
//         Students
// *************************

// Get all students
export function getStudents(successCallback, errorCallback) {
  api
    .get("students")
    .then(response => {
      console.log(response);
      successCallback(response.data);
    })
    .catch(error => {
      errorCallback(error);
    });
}
// Get student with the given netid
export function getStudent(netID, successCallback, errorCallback) {
  api
    .get("student/" + netID)
    .then(response => {
      console.log(response);
      successCallback(response.data);
    })
    .catch(error => {
      errorCallback(error);
    });
}

// *************************
//         Users
// *************************

// Get all users
export function getUsers(successCallback, errorCallback) {
  // api
  //   .get("users")
  //   .then(response => {
  //     console.log(response);
  //     successCallback(response.data);
  //   })
  //   .catch(error => {
  //     errorCallback(error);
  //   });
  var users = [
    {
      netID: "abc12",
      uniqueID: 1234567,
      role: 0,
      firstName: "Johnny",
      lastName: "Appleseed",
      phone: 7608037301,
      major: 33,
      dinners: 12,
      semesterDins: 3,
      emailText:
        "Thanks so much for applying to the dinner. I'm super excited to have you!",
      pictureId: 28
    },
    {
      netID: "abc15",
      uniqueID: 1234576,
      role: 0,
      firstName: "Billy",
      lastName: "Bob",
      phone: 7608037301,
      major: 33,
      dinners: 12,
      semesterDins: 3,
      emailText: "Thanks, bro. Yay!",
      pictureId: 27
    }
  ];
  successCallback(users);
}
// Get user with the given id
export function getUser(id, successCallback, errorCallback) {
  // api
  //   .get("/user/" + id)
  //   .then(response => {
  //     successCallback(response);
  //   })
  //   .catch(error => {
  //     errorCallback(error);
  //   });

  var user = {
    netID: "abc12",
    uniqueID: 1234567,
    role: 0,
    firstName: "Johnny",
    lastName: "Appleseed",
    phone: 7608037301,
    major: 33,
    dinners: 12,
    semesterDins: 3,
    emailText:
      "Thanks so much for applying to the dinner. I'm super excited to have you!",
    pictureId: 28
  };
  successCallback(user);
}
