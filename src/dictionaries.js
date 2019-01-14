let majorsDict = {
  "0": "Error",
  "1": "African and African American Studies",
  "2": "Art History",
  "3": "Asian and Middel Eastern Studies",
  "4": "Biology",
  "5": "Biomedical Engineering",
  "6": "Biophysics",
  "7": "Brazilian and Global Portuguese Studies",
  "8": "Chemistry",
  "9": "Civil Engineering",
  "10": "Classical Civilization",
  "11": "Classical Languages",
  "12": "Computer Science",
  "13": "Cultural Anthropology",
  "14": "Dance",
  "15": "Earth and Ocean Sciences",
  "16": "Economics",
  "17": "Electrical and Computer Engineering",
  "18": "English",
  "19": "Environmental Engineering",
  "20": "Environmental Sciences",
  "21": "Environmental Sciences and Policy",
  "22": "Evolutionary Anthropology",
  "23": "French Studies",
  "24": "Gender, Sexuality, and Feminist Studies",
  "25": "German",
  "26": "Global Cultural Studies",
  "27": "Global Health",
  "28": "History",
  "29": "Interdepartmental Major",
  "30": "International Comparative Studies",
  "31": "Italian Studies",
  "32": "Linguistics",
  "33": "Mathematics",
  "34": "Mechanical Engineering",
  "35": "Medieval and Renaissance Studies",
  "36": "Music",
  "37": "Neuroscience",
  "38": "Philosophy",
  "39": "Physics",
  "40": "Political Science",
  "41": "Program II",
  "42": "Psychology",
  "43": "Public Policy Studies",
  "44": "Religious Studies",
  "45": "Romance Studies",
  "46": "Russian",
  "47": "Slavic and Eurasian Studies",
  "48": "Sociology",
  "49": "Spanish, Latin American, and Latino/a Studies",
  "50": "Statistical Science",
  "51": "Theater Studies",
  "52": "Visual Arts",
  "53": "Visual and Media Studies",
  "54": "Undecided"
};

let departments = {
  "0": "Error",
  "1": "African and African American Studies",
  "2": "Art History",
  "3": "Asian and Middel Eastern Studies",
  "4": "Biology",
  "5": "Biomedical Engineering",
  "6": "Biophysics",
  "7": "Brazilian and Global Portuguese Studies",
  "8": "Chemistry",
  "9": "Civil Engineering",
  "10": "Classical Civilization",
  "11": "Classical Languages",
  "12": "Computer Science",
  "13": "Cultural Anthropology",
  "14": "Dance",
  "15": "Earth and Ocean Sciences",
  "16": "Economics",
  "17": "Electrical and Computer Engineering",
  "18": "English",
  "19": "Environmental Engineering",
  "20": "Environmental Sciences",
  "21": "Environmental Sciences and Policy",
  "22": "Evolutionary Anthropology",
  "23": "French Studies",
  "24": "Gender, Sexuality, and Feminist Studies",
  "25": "German",
  "26": "Global Cultural Studies",
  "27": "Global Health",
  "28": "History",
  "29": "Interdepartmental Major",
  "30": "International Comparative Studies",
  "31": "Italian Studies",
  "32": "Linguistics",
  "33": "Mathematics",
  "34": "Mechanical Engineering",
  "35": "Medieval and Renaissance Studies",
  "36": "Music",
  "37": "Neuroscience",
  "38": "Philosophy",
  "39": "Physics",
  "40": "Political Science",
  "41": "Program II",
  "42": "Psychology",
  "43": "Public Policy Studies",
  "44": "Religious Studies",
  "45": "Romance Studies",
  "46": "Russian",
  "47": "Slavic and Eurasian Studies",
  "48": "Sociology",
  "49": "Spanish, Latin American, and Latino/a Studies",
  "50": "Statistical Science",
  "51": "Theater Studies",
  "52": "Visual Arts",
  "53": "Visual and Media Studies"
};

let schools = { "0": "Error", "1": "Pratt", "2": "Trinity" };

let genderPronounsDict = {
  "0": "Error",
  "1": "he/him/his",
  "2": "she/her/hers",
  "3": "they/them/theirs",
  "4": "xe/xem/xyr",
  "5": "other"
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

exports.gradYears = function() {
  let currentYear = new Date().getFullYear();
  if (new Date().getMonth() > 5) currentYear++;

  let gradYears = [];
  for (let i = 0; i < 4; i++) {
    gradYears.push(currentYear + i);
  }
  return gradYears;
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
