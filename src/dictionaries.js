let majorsDict = {
  0: "Computer Science",
  1: "Neuro Science",
  2: "Political Science",
  3: "Public Policy",
  4: "Computer Science",
  5: "Neuro Science",
  6: "Political Science",
  7: "Public Policy"
};

let genderPronounsDict = { 0: "He, Him", 1: "She, Her", 2: "They, Them" };

let graduationYear = [2019, 2020, 2021, 2022];

let departments = {
  0: "Computer Science",
  1: "Neuro Science",
  2: "Political Science",
  3: "Public Policy",
  4: "Computer Science",
  5: "Neuro Science",
  6: "Political Science",
  7: "Public Policy",
  8: "Computer Science",
  9: "Neuro Science",
  10: "Political Science",
  11: "Public Policy"
};

let schools = {
  0: "Pratt",
  1: "Trinity"
};

exports.majorsDict = function() {
  return majorsDict;
};

exports.getMajor = function(key) {
  return majorsDict[key];
};

exports.genderPronouns = function() {
  return genderPronounsDict;
};

exports.getGenderPronouns = function(key) {
  return genderPronounsDict[key];
};

exports.graduationYears = function() {
  return graduationYear;
};

exports.schools = function() {
  return schools;
};

exports.getSchool = function(key) {
  return schools[key];
};

exports.departments = function() {
  return departments;
};

exports.getDepartment = function(key) {
  return departments[key];
};
