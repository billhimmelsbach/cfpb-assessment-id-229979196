Cypress.Commands.add('clickAddButton', () => {
  cy.get('.add').click();
});

Cypress.Commands.add('inputAge', (age) => {
  if (age) {
    cy.get('#age').type(age);
  }
});

Cypress.Commands.add('inputValidRelationship', (rel) => {
  if (rel) {
    cy.get('#rel').select(rel);
    cy.get('#rel').should('have.value', rel);
  }
});

Cypress.Commands.add('inputValidSmoker', (smoker) => {
  if (smoker === 'on') {
    cy.get('#smoker').check();
    cy.get('#smoker').should('be.checked');
  } else {
    const test = cy.get('#smoker');
    cy.get('#smoker').should('not.be.checked');
  }
});
