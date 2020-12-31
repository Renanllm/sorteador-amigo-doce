const d = document;
const people = [];
let startDraw = false;
let canDrawAgain = true;

// -------------------------------------

const runScript = (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    addPeople();
    return false;
  }
}

const drawPeople = () => {
  if (canDrawAgain) {
    const randomNumber = Math.floor(Math.random() * people.length);

    const personWasRemoved = people[randomNumber];
    people.splice(randomNumber, 1);
    canDrawAgain = false;
    setTimeout(() => {
      canDrawAgain = true;
    }, 10000);
    markAsChosen(personWasRemoved);
    showTheFriendChosen(personWasRemoved);

    return;
  }

  console.log('No time bro!');
};

const markAsChosen = (person) => {
  const personElement = d.querySelector(`#person-${person}`);
  personElement.style.backgroundColor = '#C82333';
};

const showTheFriendChosen = (person) => {
  const h1Element = d.querySelector('#person-chosen');
  h1Element.textContent = `🎉🎉 ${String(person).toUpperCase()} 🎉🎉`;
}

const addPeople = () => {
  const person = d.querySelector(".form-control");
  if (String(person.value).length >= 4) {
    people.push(person.value);

    createElement(person.value);
    person.value = "";
  }
}

const createElement = (person) => {
  const listContainer = d.querySelector("#list-people");
  const containerPeople = d.createElement("div");

  containerPeople.className = "container-person";
  containerPeople.id = `person-${person}`;
  containerPeople.innerHTML = person;
  containerPeople.setAttribute('onclick', `deletePerson('${person}')`)

  listContainer.appendChild(containerPeople);
}

const deletePerson = (person) => {
  if (!startDraw) {
    const personIndex = people.findIndex(pers => pers == person);
    if (personIndex >= 0) {
      people.splice(person, 1);
      console.log(people);

      removeElement(person);
    }
  }
}

const removeElement = (person) => {
  const listContainer = d.querySelector("#list-people");
  const elementChild = d.querySelector(`#person-${person}`);
  listContainer.removeChild(elementChild);
}

const start = () => {
  // if (people.size > 5) {
  startDraw = true;

  removeScreen("form");
  removeScreen("start-button");
  showScreenDraw();
  // }
}

const removeScreen = (screen) => {
  const formElement = d.querySelector(`#${screen}`);
  formElement.style.display = 'none';
}

const showScreenDraw = () => {
  const startButtonElement = d.querySelector("#screen-draw");
  startButtonElement.style.display = 'block';
}