const INFO_PANELS = [
  "maxhr",
  "fastingbs",
  "chestpain",
  "exerciseangina",
  "oldpeak",
  "stslope",
  "cholesterol",
];

let activeInd = 0;
let activeElem = document.getElementById(`${INFO_PANELS[0]}-info`);

const INFO_BTNS = Array.from(document.getElementsByClassName("info-btn"));

INFO_BTNS.forEach((info_btn) => {
  info_btn.addEventListener("click", () => {
    const ind = parseInt(info_btn.getAttribute("data-index"));
    if (ind === activeInd) return;
    activeElem.classList.add("d-none");
    activeElem.classList.remove("d-flex");
    const activateElem = document.getElementById(`${INFO_PANELS[ind]}-info`);
    activateElem.classList.remove("d-none");
    activateElem.classList.add("d-flex");
    info_btn.classList.add("active");
    INFO_BTNS[activeInd].classList.remove("active");
    activeElem = activateElem;
    activeInd = ind;
  });
});
