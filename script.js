const checkMark = "\u2713";

const eightCharactersRegex = new RegExp("^(?=.{8,})");

const StateDown = document.getElementById("StateDropdown");
const OccuDropdown = document.getElementById("OccupationDropdown");
// console.log({ OccuDropdown });
const getPost = async () => {
  const response = await fetch(
    "https://frontend-take-home.fetchrewards.com/form"
  );
  const data = await response.json();
  // console.log({ data });
  return data;
};

const displayOption = async () => {
  const options = await getPost();
  for (option of options.occupations) {
    const newOption = document.createElement("option");
    newOption.value = option;
    newOption.text = option;
    OccuDropdown.appendChild(newOption);
  }
  for (option of options.states) {
    let oldOption = document.createElement("option");
    // console.log(option);
    oldOption = document.createElement("option");
    oldOption.value = option.abbreviation;
    oldOption.text = option.name;
    StateDown.appendChild(oldOption);
  }
};
