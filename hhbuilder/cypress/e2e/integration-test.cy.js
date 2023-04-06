// load a fixture in the future?
context('hhbuilder', () => {
  beforeEach(() => {
    cy.visit('../index.html');
  });

  it('can submit a new household', () => {
    cy.get('#age').type('13');
    cy.get('#age').should('have.value', '13');
    cy.get('#rel').select('Self');
    cy.get('#rel').should('have.value', 'self');
    cy.get('#smoker').check();
    cy.get('#smoker').should('have.value', 'on');

    cy.get('.add').click();
    cy.get('.household').should('contain', 'Age: 13');
    cy.get('.household').should('contain', 'Relationship: self');
    cy.get('.household').should('contain', 'Smoker? yes');

    cy.get('button[type="submit"]').click();
    cy.get('pre').should('contain', '13');
    cy.get('pre').should('contain', 'self');
    cy.get('pre').should('contain', 'true');
  });
});
