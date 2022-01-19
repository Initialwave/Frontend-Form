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
displayOption();

const handleClick = async () => {
  let email = document.getElementById("email").value;
  let name = document.getElementById("name").value;
  let password = document.getElementById("confirmPasswordInput").value;
  let occupation = document.getElementById("OccupationDropdown").value;
  let state = document.getElementById("StateDropdown").value;
  // console.log("it Fired");
  // console.log(handleClick);
  await checkValidity("");
  if (
    email !== "" &&
    name !== "" &&
    password !== "" &&
    occupation !== "" &&
    state !== ""
  ) {
    await fetch("https://frontend-take-home.fetchrewards.com/form", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        occupation: occupation,
        state: state,
      }),
    })
      .then(res => {
        window.alert("successfully posted");
      })
      .catch(() => {
        window.alert("failed to Create Form");
      });
  } else {
    window.alert("Cannot leave fields empty");
  }
};
