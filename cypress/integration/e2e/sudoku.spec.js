describe('sidoku', () => {
  const button = {
    'New Game': 'newGame',
    Solve: 'solve',
    Validate: 'validate',
  };
  it('open apps', () => {
    cy.visit('http://127.0.0.1:5500/src/index.html');
    cy.get('.sudoku-container').should('be.visible');
    cy.get('tr').should('have.length', 9);
    cy.get('td').should('have.length', 81);
    cy.get('#controls')
      .children()
      .each((elem) => {
        expect(button).to.haveOwnProperty(elem[0].innerText);
        expect(elem).to.have.css('background-color', 'rgb(76, 150, 137)');
      });
  });

  it('check row', () => {
    cy.get('tr')
      .eq(0)
      .children()
      .children()
      .filter('.disabled')
      .each((elem) => {
        expect(elem).to.have.css('background-color', 'rgb(76, 150, 137)');
        expect(elem).to.have.css('cursor', 'not-allowed');
        expect(elem).not.have.value(null);
      });
  });
});
