// TODO: update these error messages
const ERROR_MESSAGES = {
  age: "Household member's age must be greater than the age of 0",
  relationship: 'Please enter a relationship for this household member',
};

// would use a log service like Sentry instead of console.error in production
const logError = (error) => {
  console.error(error);
};

// would prefer to use a store for this
let householdMemberList = [];

// The following code is based on the restriction from the assessment challenge that the index.js
// file cannot be changed in any way while also following industry standard accessibility practices.
// Accessibility best practices are to use HTML's built-in form validation as much as possible in
// order to allow the widest range of screen readers to report input restrictions (see screen reader
// demo in the README)
const addFormValidationToHtml = () => {
  const setAgeInputValidation = () => {
    const ageInput = document.getElementById('age');
    ageInput.required = true;
    ageInput.type = 'number';
    ageInput.min = 1;
    // only allowing whole integer ages
    ageInput.step = '1';
    // allows immediate UX feedback on input if custom validation fails
    ageInput.oninput = (event) => event.target.setCustomValidity('');
  };
  setAgeInputValidation();

  const setRelationshipInputValidation = () => {
    const relationshipInput = document.getElementById('rel');
    relationshipInput.required = true;
  };
  setRelationshipInputValidation();

  const ignoreFormValidationOnSubmit = () => {
    const form = document.querySelector('form');
    form.noValidate = true;
  };
  ignoreFormValidationOnSubmit();
};

const addEventListenerToQueriedElement = (query, event, callback) => {
  try {
    const element = document.querySelector(query);
    if (!element) {
      throw Error(`No element found for query: ${query}`);
    }
    element.addEventListener(event, callback);
  } catch (error) {
    logError(error);
  }
};

const getCurrentHouseholdMember = () => {
  // I would normally use the FormData API for extensibility, but the assessment prevents editing of
  // the index.js, which means I'd have to explicitly overwrite the bad form input names names "rel"
  // and "smoker" anyway
  const age = document.getElementById('age').value;
  const relationship = document.getElementById('rel').value;
  const isSmoker = document.getElementById('smoker').checked;
  const householdMember = {
    age,
    relationship,
    isSmoker,
  };
  return householdMember;
};

const validateHouseholdMember = (householdMember) => {
  const form = document.querySelector('form');
  const ageInput = document.getElementById('age');
  // prevent non-number inputs still allowed by a number type input
  const invalidNumberChars = ['e', 'E', '+', '.'];
  ageInput.setCustomValidity('');
  if (invalidNumberChars?.some((char) => householdMember.age.includes(char))) {
    ageInput.setCustomValidity('Age must only be a whole number.');
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    throw Error('Form has failed frontend validation');
  }
};

const renderNewHouseholdList = () => {
  const removeUser = (index) => {
    householdMemberList.splice(index, 1);
    renderNewHouseholdList(householdMemberList);
  };
  // keep source of truth (would be great to keep a declarative data flow)
  const getMemberListItemMarkup = ({ age, relationship, isSmoker }, index) => {
    // keep <ol> as parent element with <li> children for accessibility
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
    deleteButton.addEventListener('click', () => removeUser(index));
    householdMemberListItem.appendChild(deleteButton);

    return householdMemberListItem;
  };
  const household = document.querySelector('.household');
  household.innerHTML = '';
  if (householdMemberList.length === 0) {
    console.log('No household members to render');
    return;
  }

  householdMemberList.forEach((householdMember, index) => {
    const memberListItem = getMemberListItemMarkup(householdMember, index);
    household.appendChild(memberListItem);
  });
};

const resetForm = () => {
  const form = document.querySelector('form');
  form.reset();
};

// verify first with server response, use source of truth of the server response after full submit
// if multiple users can submit at once, you'd want to sync
// might become a bit unperformant for extremely large household lists, so a declarative framework

const addHouseholdMember = (event) => {
  event.preventDefault();
  const householdMember = getCurrentHouseholdMember();
  validateHouseholdMember(householdMember);
  householdMemberList.push(householdMember);
  renderNewHouseholdList();
  resetForm();
};

const renderDebugInfo = (serverHouseholdDataString) => {
  const debugInfo = document.querySelector('.debug');
  debugInfo.innerHTML = serverHouseholdDataString;
  debugInfo.style.display = 'block';
};

const submitHousehold = async (event) => {
  event.preventDefault();
  try {
    const householdMemberListJsonString = JSON.stringify(householdMemberList);

    const getServerResponse = async () => {
      // I've included a really basic fetch commented out below as a placeholder if this assessment
      // had a backend with maybe JWT auth?

      // const mockedServerResponse = await fetch('cfpb-api-endpoint.com/household', {
      //   method: 'PUT', // or maybe POST depending on how the backend is set up
      //   headers: {
      //     Authorization: 'Bearer' + JwtAuthTokenFromLocalStorage,
      //     'Content-Type': 'application/json',
      //   },
      //   body: householdJsonString,
      // });

      // a really basic mocked server response, with my favorite best practice of returning the
      // updated data to the client to keep the server as the source of truth
      const mockedServerResponse = new Response(
        JSON.stringify({
          headers: {
            'Content-Type': 'application/json',
          },
          body: householdMemberListJsonString,
        }),
        { options: { status: 500 } },
      );
      return mockedServerResponse;
    };
    const response = await getServerResponse();
    if (!response?.ok) {
      throw Error(`Error, HTTP Response Code: ${response?.status}`);
    }

    const serverResponseJson = await response.json();
    renderDebugInfo(serverResponseJson?.body);
    const serverHouseholdData = JSON.parse(serverResponseJson?.body);
    // server as source of truth
    householdMemberList = serverHouseholdData;
  } catch (error) {
    logError(error);
  }
  resetForm();
};

addEventListenerToQueriedElement('form', 'submit', submitHousehold);
addEventListenerToQueriedElement('.add', 'click', addHouseholdMember);
addFormValidationToHtml();
