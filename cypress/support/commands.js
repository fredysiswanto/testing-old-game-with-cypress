// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add('login', (email, password) => {
//   cy.visit('/');
//   cy.get('[href="http://127.0.0.1:8000/login"]')
//     .should('includes.text', 'Login')
//     .click();
//   cy.get('#txt-email').type(email);
//   cy.get('#txt-password').type(password);
//   cy.get('button[type=submit]').contains('Log in').click();
// });
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false;
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});

// ambil data dari fixture
Cypress.Commands.add('getDataFixture', (file, obj) => {
  cy.fixture(`${file}-data.json`).then((data) => data[`${obj}`]);
});

// board size
Cypress.Commands.add('boardSize', (size, tile) => {
  // const dimensi = {small:5,medium:7,9}
  cy.get('select')
    .select(size)
    .then(() => {
      cy.get('.tile').should('have.length', tile);
    });
});

Cypress.Commands.add('findPet', (url, id) => {
  cy.request({
    method: 'GET',
    url: `${url}/pet/${id}`,
    failOnStatusCode: false,
  }).should((res) => {
    if (res.status === 200) {
      cy.log(`Your Pet : ${res.body.name} berhasil di temukan`);
    } else if (res.status === 400) {
      cy.log(res.body.message);
    } else if (res.status === 404) {
      cy.log(res.body.message);
    } else {
      cy.log(res.body.message);
    }
  });
});
