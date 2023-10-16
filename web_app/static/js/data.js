import {
  boxplotNY,
  stackedBarChartYN,
  stackedBarChartMF,
  chestPainTypeChart,
  stSlopeChart,
} from "./charts.js";
import {
  ageN,
  ageY,
  chestPainTypeInfo,
  cholesterolN,
  cholesterolY,
  exerciseAnginaInfo,
  fastingBSInfo,
  maxHRN,
  maxHRY,
  oldpeakN,
  oldpeakY,
  sexInfo,
  stSlopeInfo,
} from "./chart-data.js";
import { boxPlotInfo } from "./chart-util.js";

// Get user form data on submit
const postUserData = async (userData) => {
  // const userData = {
  //   MaxHR: 90,
  //   Cholesterol: 180,
  //   FastingBS: 1,
  //   Age: 60,
  //   Sex: 0,
  //   Oldpeak: 0.5,
  //   ChestPainType: 2,
  //   ExerciseAngina: 1,
  //   ST_Slope: 0,
  // };

  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(userData),
  });
  const responseJson = await response.json();
  const prediction = responseJson.prediction[0];
  return prediction;
};

const displayUserData = (userData, prediction) => {
  const resultsElem = document.getElementById("results");
  resultsElem.classList.remove("d-none");

  const sex = parseInt(userData.Sex);
  const age = parseInt(userData.Age);
  const fastingBS = parseInt(userData.FastingBS);
  const chestPainType = parseInt(userData.ChestPainType);
  const exerciseAngina = parseInt(userData.ExerciseAngina);
  const oldpeak = parseFloat(userData.Oldpeak);
  const stSlope = parseInt(userData.ST_Slope);
  const cholesterol = parseInt(userData.Cholesterol);
  const maxHR = parseInt(userData.MaxHR);

  // Get corresponding labels
  const fastingBSLabel = fastingBS ? "Y" : "N";
  const sexLabel = sex ? "M" : "F";

  const chestPainTypes = {
    0: "ATA",
    1: "NAP",
    2: "ASY",
    3: "TA",
  };
  const chestPainTypeLabel = chestPainTypes[chestPainType];
  const exerciseAnginaLabel = exerciseAngina ? "Y" : "N";

  const stSlopes = {
    0: "Up",
    1: "Flat",
    2: "Down",
  };
  const stSlopeLabel = stSlopes[stSlope];

  const predictionLabel = prediction ? "Y" : "N";
  document.getElementById("sex-value").textContent = sexLabel;
  document.getElementById("age-value").textContent = age;
  document.getElementById("fastingbs-value").textContent = fastingBSLabel;
  document.getElementById("chestpaintype-value").textContent =
    chestPainTypeLabel;
  document.getElementById("exerciseangina-value").textContent =
    exerciseAnginaLabel;
  document.getElementById("oldpeak-value").textContent = oldpeak;
  document.getElementById("stslope-value").textContent = stSlopeLabel;
  document.getElementById("maxhr-value").textContent = maxHR;
  document.getElementById("cholesterol-value").textContent = cholesterol;
  document.getElementById("prediction-value").textContent = predictionLabel;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());
  value.topics = data.getAll("topics");
  const userData = {
    MaxHR: value.maxHR,
    Cholesterol: value.cholesterol,
    FastingBS: value.fastingBS,
    Age: value.age,
    Sex: value.sex,
    Oldpeak: value.oldpeak,
    ChestPainType: value.chestPainType,
    ExerciseAngina: value.exerciseAngina,
    ST_Slope: value.stSlope,
  };
  const predictionStr = await postUserData(userData);
  const prediction = parseInt(predictionStr);
  displayUserData(userData, prediction);

  const age = parseInt(userData.Age);
  let ageYCopy = [...ageY];
  let ageNCopy = [...ageN];

  const sex = parseInt(userData.Sex);
  let sexInfoCopy = { ...sexInfo };
  let sexCategory = "";

  const fastingBS = parseInt(userData.FastingBS);
  let fastingBSInfoCopy = { ...fastingBSInfo };
  let fastingBSCategory = "";

  const exerciseAngina = parseInt(userData.ExerciseAngina);
  let exerciseAnginaInfoCopy = { ...exerciseAnginaInfo };
  let exerciseAnginaCategory = "";

  const oldpeak = parseFloat(userData.Oldpeak);
  let oldpeakNCopy = [...oldpeakN];
  let oldpeakYCopy = [...oldpeakY];

  const chestPainTypeInd = parseInt(userData.ChestPainType);
  const chestPainTypes = {
    0: "ATA",
    1: "NAP",
    2: "ASY",
    3: "TA",
  };
  const chestPainType = chestPainTypes[chestPainTypeInd];
  let chestPainTypeInfoCopy = { ...chestPainTypeInfo };
  let chestPainTypeCategory = "";

  const stSlopeInd = parseInt(userData.ST_Slope);
  const stSlopeTypes = {
    0: "Up",
    1: "Flat",
    2: "Down",
  };
  const stSlope = stSlopeTypes[stSlopeInd];
  let stSlopeInfoCopy = { ...stSlopeInfo };
  let stSlopeCategory = "";

  const cholesterol = parseInt(userData.Cholesterol);
  let cholesterolYCopy = [...cholesterolY];
  let cholesterolNCopy = [...cholesterolN];

  const maxHR = parseInt(userData.MaxHR);
  let maxHRYCopy = [...maxHRY];
  let maxHRNCopy = [...maxHRN];

  if (prediction) {
    ageYCopy.push(age);
    oldpeakYCopy.push(oldpeak);
    cholesterolYCopy.push(cholesterol);
    maxHRYCopy.push(maxHR);
    chestPainTypeInfoCopy["Y"][chestPainType] += 1;
    chestPainTypeCategory = `Y${chestPainType}`;
    stSlopeInfoCopy["Y"][stSlope] += 1;
    stSlopeCategory = `Y${stSlope}`;

    if (sex) {
      sexInfoCopy.Y.M += 1;
      sexCategory = "YM";
    } else {
      sexInfoCopy.Y.F += 1;
      sexCategory = "YN";
    }
    if (fastingBS) {
      fastingBSInfoCopy.Y.Y += 1;
      fastingBSCategory = "YY";
    } else {
      fastingBSInfoCopy.Y.N += 1;
      fastingBSCategory = "YN";
    }
    if (exerciseAngina) {
      exerciseAnginaInfoCopy.Y.Y += 1;
      exerciseAnginaCategory = "YY";
    } else {
      exerciseAnginaInfoCopy.Y.N += 1;
      exerciseAnginaCategory = "YN";
    }
  } else {
    ageNCopy.push(age);
    oldpeakNCopy.push(oldpeak);
    cholesterolNCopy.push(cholesterol);
    maxHRNCopy.push(maxHR);
    chestPainTypeInfoCopy["N"][chestPainType] += 1;
    chestPainTypeCategory = `N${chestPainType}`;
    stSlopeInfoCopy["N"][stSlope] += 1;
    stSlopeCategory = `N${stSlope}`;

    if (sex) {
      sexInfoCopy.N.M += 1;
      sexCategory = "NM";
    } else {
      sexInfoCopy.N.F += 1;
      sexCategory = "NF";
    }
    if (fastingBS) {
      fastingBSInfoCopy.N.Y += 1;
      fastingBSCategory = "NY";
    } else {
      fastingBSInfoCopy.N.N += 1;
      fastingBSCategory = "NN";
    }
    if (exerciseAngina) {
      exerciseAnginaInfoCopy.N.Y += 1;
      exerciseAnginaCategory = "NY";
    } else {
      exerciseAnginaInfoCopy.N.N += 1;
      exerciseAnginaCategory = "NN";
    }
  }

  boxplotNY(
    "age-chart",
    "Age wrt Heart Disease",
    "Age",
    boxPlotInfo(ageNCopy),
    boxPlotInfo(ageYCopy),
    age
  );
  stackedBarChartMF(
    "sex-chart",
    "Sex wrt Heart Disease",
    sexInfoCopy,
    sexCategory
  );
  stackedBarChartYN(
    "fastingbs-chart",
    "Fasting BS wrt Heart Disease",
    fastingBSInfoCopy,
    fastingBSCategory
  );
  chestPainTypeChart(chestPainTypeInfoCopy, chestPainTypeCategory);
  boxplotNY(
    "oldpeak-chart",
    "Oldpeak wrt Heart Disease",
    "Oldpeak",
    boxPlotInfo(oldpeakNCopy),
    boxPlotInfo(oldpeakYCopy),
    oldpeak
  );
  stackedBarChartYN(
    "exerciseangina-chart",
    "Exercise Angina wrt Heart Disease",
    exerciseAnginaInfoCopy,
    exerciseAnginaCategory
  );
  stSlopeChart(stSlopeInfoCopy, stSlopeCategory);
  boxplotNY(
    "cholesterol-chart",
    "Cholesterol wrt Heart Disease",
    "Cholesterol",
    boxPlotInfo(cholesterolNCopy),
    boxPlotInfo(cholesterolYCopy),
    cholesterol
  );
  boxplotNY(
    "maxhr-chart",
    "Max HR wrt Heart Disease",
    "Max HR",
    boxPlotInfo(maxHRNCopy),
    boxPlotInfo(maxHRYCopy),
    maxHR
  );
  document.getElementById("visualizations").scrollIntoView();
};
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
