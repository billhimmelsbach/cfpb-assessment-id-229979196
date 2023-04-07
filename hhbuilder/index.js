// would prefer to use a more formal store for this
let householdMemberList = [];

const form = document.querySelector('form');
const addButton = document.querySelector('.add');
const ageInput = document.getElementById('age');
const relationshipInput = document.getElementById('rel');
const isSmokerInput = document.getElementById('smoker');
const debugInfo = document.querySelector('.debug');
const householdList = document.querySelector('.household');

const renderDebugInfo = (serverHouseholdDataString) => {
  debugInfo.innerHTML = serverHouseholdDataString;
  if (serverHouseholdDataString === '[]') {
    debugInfo.style.display = 'none';
  } else {
    debugInfo.style.display = 'block';
  }
};

// would use a log service like Sentry instead of console.error in production
const reportError = (error) => {
  console.error(error);
  renderDebugInfo(`An error has prevented your submission: ${JSON.stringify(error.message)}`);
  throw error;
};

// Accessibility best practices are to use HTML's built-in form validation as much as possible for
// screen reader compatibility. See README.md for more details.
const setAgeInputValidation = () => {
  ageInput.required = true;
  ageInput.type = 'number';
  ageInput.min = 1;
  // only allowing whole integer ages
  ageInput.step = '1';
  // immediately remove the validation message on new input for custom validity
  ageInput.oninput = (event) => event.target.setCustomValidity('');
};

const setRelationshipInputValidation = () => {
  relationshipInput.required = true;
};
setRelationshipInputValidation();

const ignoreFormValidationOnSubmit = () => {
  form.noValidate = true;
};

const addFormValidationToHtml = () => {
  setAgeInputValidation();
  setRelationshipInputValidation();
  ignoreFormValidationOnSubmit();
};

// Would prefer to use FormData API for extensibility here if without restrictions, see README.md
const getCurrentHouseholdMember = () => ({
  age: ageInput.value,
  relationship: relationshipInput.value,
  isSmoker: isSmokerInput.checked,
});

const getIsHousholdMemberValid = (householdMember) => {
  // prevent non-number inputs still allowed by a number type input
  const invalidNumberChars = ['e', 'E', '+', '.'];
  ageInput.setCustomValidity('');
  if (invalidNumberChars?.some((char) => householdMember.age.includes(char))) {
    ageInput.setCustomValidity('Age must only be a whole number.');
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }
  return true;
};

const getMemberListItemMarkup = ({ age, relationship, isSmoker }, index) => {
  const householdMemberListItem = document.createElement('li');
  householdMemberListItem.innerHTML = `
  <ul>
    <li>Age: ${age}</li>
    <li>Relationship: ${relationship}</li>
    <li>Smoker? ${isSmoker ? 'yes' : 'no'}</li>
  <ul>
`;
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Remove';
  householdMemberListItem.appendChild(deleteButton);

  return householdMemberListItem;
};

const renderNewHouseholdList = () => {
  householdList.innerHTML = '';
  if (householdMemberList.length === 0) {
    return;
  }

  const removeUser = (index) => {
    householdMemberList.splice(index, 1);
    renderNewHouseholdList(householdMemberList);
  };

  // keep server source of truth and try to keep a unidirectional data flow
  // maybe would need a declarative framework for extremely long households
  householdMemberList.forEach((householdMember, index) => {
    const memberListItem = getMemberListItemMarkup(householdMember, index);
    memberListItem.querySelector('button').addEventListener('click', () => removeUser(index));
    householdList.appendChild(memberListItem);
  });
};

const addHouseholdMember = (event) => {
  event.preventDefault();
  const householdMember = getCurrentHouseholdMember();
  const isHouseholdMemberValid = getIsHousholdMemberValid(householdMember);
  if (!isHouseholdMemberValid) {
    return;
  }
  householdMemberList.push(householdMember);
  renderNewHouseholdList();
  form.reset();
};

// a really basic mocked server response, keep server as the source of truth
// assumes backend will send back the modified collection on success
const getMockServerResponse = async (householdMemberListJsonString) => {
  const mockedServerResponse = new Response(
    JSON.stringify({
      headers: {
        'Content-Type': 'application/json',
      },
      body: householdMemberListJsonString,
    }),
  );
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockedServerResponse;
};

const submitHousehold = async (event) => {
  event.preventDefault();
  try {
    const householdMemberListJsonString = JSON.stringify(householdMemberList);
    const response = await getMockServerResponse(householdMemberListJsonString);
    if (!response?.ok) {
      throw Error(`Error, HTTP Response Code: ${response?.status}`);
    }

    const serverResponseJson = await response.json();
    renderDebugInfo(serverResponseJson?.body);
    const serverHouseholdData = JSON.parse(serverResponseJson?.body);
    // server as source of truth
    householdMemberList = serverHouseholdData;
  } catch (error) {
    reportError(error);
  }
};

form.addEventListener('submit', submitHousehold);
addButton.addEventListener('click', addHouseholdMember);
addFormValidationToHtml();
