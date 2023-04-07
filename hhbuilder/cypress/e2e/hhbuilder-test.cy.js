const determineValidity = (boolean) => {
  if (boolean) {
    return '';
  } else {
    return 'not.';
  }
};

const getRandomItemFromUsersArray = (usersArray) => {
  return usersArray[Math.floor(Math.random() * usersArray.length)];
};

const inputHouseholdMember = (user) => {
  cy.inputAge(user.age);
  cy.inputValidRelationship(user.rel);
  cy.inputValidSmoker(user.smoker);
};

const addHouseHoldMember = (user, isValid = true) => {
  const validity = determineValidity(isValid);
  inputHouseholdMember(user);
  cy.clickAddButton();

  cy.get('.household').should(validity + 'contain', 'Age: ' + user.age);
  cy.get('.household').should(validity + 'contain', 'Relationship: ' + user.rel);
  cy.get('.household').should(
    validity + 'contain',
    'Smoker? ' + user.smoker == 'on' ? 'yes' : 'no',
  );
};

const submitHousehold = (user) => {
  addHouseHoldMember(user);

  cy.get('button[type="submit"]').click();
  cy.get('pre').should('contain', user.age);
  cy.get('pre').should('contain', user.rel);
  cy.get('pre').should('contain', user.smoker == 'on' ? 'true' : 'false');
};

context('hhbuilder', () => {
  // sets up two fixtures with set and random ordering
  let usersArray;
  let randomUsersArray = [];
  beforeEach(() => {
    cy.fixture('users').then((json) => {
      usersArray = json;
      for (let step = 0; step < 5; step++) {
        randomUsersArray.push(getRandomItemFromUsersArray(json));
      }
    });
    cy.visit('../index.html');
  });
  afterEach(() => {
    randomUsersArray = [];
  });

  it('can input a household member', () => {
    inputHouseholdMember(usersArray[0]);
  });
  context('and prevent adding an invalid household member', () => {
    context('by age', () => {
      it('if a decimal', () => {
        usersArray[0].age = '22.2';
        addHouseHoldMember(usersArray[0], false);
      });
      it('if a letter', () => {
        usersArray[0].age = 'X3';
        cy.inputAge(usersArray[0].age);
        cy.inputValidRelationship(usersArray[0].rel);
        cy.clickAddButton();
        cy.get('.household').should('contain', '3');
      });
      it('if a number < 1', () => {
        usersArray[0].age = '22.2';
        addHouseHoldMember(usersArray[0], false);
      });
      it('if no number', () => {
        usersArray[0].age = null;
        addHouseHoldMember(usersArray[0], false);
      });
    });
    context('by relationship', () => {
      it('if none selected', () => {
        usersArray[0].rel = null;
        addHouseHoldMember(usersArray[0], false);
      });
    });
  });

  it('can add a household member', () => {
    addHouseHoldMember(usersArray[0]);
  });
  it('can remove a household member', () => {
    addHouseHoldMember(usersArray[0]);
    cy.get('button:contains("Remove")').click();
    cy.get('.household').should('not.contain', 'Age: ' + usersArray[0].age);
  });
  it('can submit a new household', () => {
    submitHousehold(usersArray[0]);
  });
  it('can submit a new household with multiple members', () => {
    submitHousehold(usersArray[0]);
    submitHousehold(usersArray[1]);
    submitHousehold(usersArray[2]);
  });
  it('can submit a new household with multiple members in random order', () => {
    submitHousehold(randomUsersArray[0]);
    submitHousehold(randomUsersArray[1]);
    submitHousehold(randomUsersArray[2]);
  });
});
