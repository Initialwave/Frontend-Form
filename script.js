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
const checkValidity = () => {
  let password = document.getElementById("passwordInput").value;
  let confirmPassword = document.getElementById("confirmPasswordInput").value;
  let email = document.getElementById("email").value;
  let name = document.getElementById("name").value;

  const valid = [];
  const invalid = [];

  eightCharactersRegex.test(password)
    ? valid.push(document.getElementById("lengthRequirement"))
    : invalid.push(document.getElementById("lengthRequirement"));

  password && password === confirmPassword
    ? valid.push(document.getElementById("passwordsMatchRequirement"))
    : invalid.push(document.getElementById("passwordsMatchRequirement"));

  email && email.includes("@") !== ""
    ? valid.push(document.getElementById("email"))
    : invalid.push(document.getElementById("email"));

  name.length >= 10 && name !== ""
    ? valid.push(document.getElementById("name"))
    : invalid.push(document.getElementById("name"));

  StateDown.value && StateDown.value !== ""
    ? valid.push(document.getElementById("StateDropdown"))
    : invalid.push(document.getElementById("StateDropdown"));

  OccuDropdown.value && OccuDropdown.value !== ""
    ? valid.push(document.getElementById("OccupationDropdown"))
    : invalid.push(document.getElementById("OccupationDropdown"));

  valid.forEach(el => {
    el.classList.remove("invalid");
    el.classList.add("valid");
  });
  invalid.forEach(el => {
    el.classList.remove("valid");
    el.classList.add("invalid");
  });
  console.log(valid);
  if (valid.length === 6) document.getElementById("submitBtn").disabled = false;
  else document.getElementById("submitBtn").disabled = true;
};

Array.from(document.getElementsByClassName("input-listener")).forEach(input => {
  input.addEventListener("keyup", checkValidity);
});
Array.from(document.getElementsByClassName("select-listener")).forEach(
  input => {
    input.addEventListener("change", checkValidity);
  }
);