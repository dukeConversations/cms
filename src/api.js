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
  // api
  //   .get("/dinner/", {
  //     params: {
  //       id: id
  //     }
  //   })
  //   .then(response => {
  //     successCallback(response.data);
  //   })
  //   .catch(error => {
  //     errorCallback(error);
  //   });
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

// *************************
//         Students
// *************************

// Get all students
export function getStudents(successCallback, errorCallback) {
  // api
  //   .get("students")
  //   .then(response => {
  //     console.log(response);
  //     successCallback(response.data);
  //   })
  //   .catch(error => {
  //     errorCallback(error);
  //   });
  var students = [
    {
      netID: "abc01",
      uniqueID: 7654321,
      role: 0,
      firstName: "Cooper",
      lastName: "Edmunds",
      phone: 7608037301,
      major: 33,
      genderPronouns: 0,
      gradYear: 20,
      numApps: 5,
      numSelections: 3,
      semesterApps: 2,
      semesterDins: 2
    },
    {
      netID: "abc02",
      uniqueID: 7564321,
      role: 0,
      firstName: "Yasa",
      lastName: "Baig",
      phone: 7608037301,
      major: 33,
      genderPronouns: 0,
      gradYear: 20,
      numApps: 0,
      numSelections: 0,
      semesterApps: 0,
      semesterDins: 0
    },
    {
      netID: "abc03",
      uniqueID: 7564312,
      role: 0,
      firstName: "Grant",
      lastName: "Besner",
      phone: 7608037301,
      major: 33,
      genderPronouns: 0,
      gradYear: 20,
      numApps: 0,
      numSelections: 0,
      semesterApps: 0,
      semesterDins: 0
    }
  ];
  successCallback(students);
}
// Get student with the given netid
export function getStudent(netid, successCallback, errorCallback) {
  // api
  //   .get("/student/", {
  //     params: {
  //       netid: netid
  //     }
  //   })
  //   .then(response => {
  //     successCallback(response.data);
  //   })
  //   .catch(error => {
  //     errorCallback(error);
  //   });
  api
    .get("/student/" + netid)
    .then(response => {
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
      email_text:
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
      email_text: "Thanks, bro. Yay!",
      pictureId: 27
    }
  ];
  successCallback(users);
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

  var user = {
    netID: "abc12",
    uniqueID: 1234567,
    role: 0,
    firstFame: "Johnny",
    lastName: "Appleseed",
    phone: 7608037301,
    major: 33,
    dinners: 12,
    semesterDins: 3,
    email_text:
      "Thanks so much for applying to the dinner. I'm super excited to have you!",
    pictureId: 28
  };
  successCallback(user);
}
