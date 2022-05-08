describe('sidoku', () => {
  const button = {
    'New Game': 'newGame',
    Solve: 'solve',
    Validate: 'validate',
  };

  const listNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // cek element firts load
  it.skip('open apps', () => {
    cy.visit('/');
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

  it.skip('check row', () => {
    const valueEachRow = ['2', '2'];
    // const valueEachRow = [];
    let findDuplicates = (arr) =>
      arr.filter((item, index) => arr.indexOf(item) != index);
    cy.visit('/');
    cy.get('tr')
      .eq(0)
      .children()
      .children()
      .filter('.disabled')
      .each((elem) => {
        expect(elem).to.have.css('background-color', 'rgb(76, 150, 137)');
        expect(elem).to.have.css('cursor', 'not-allowed');
        expect(elem).not.have.value(null);
        cy.log(
          `position : [${elem[0].col}, ${elem[0].row}] have value = ${elem[0].value}`
        );
        valueEachRow.push(elem[0].value);
        // expect(valueEachRow).to.include(elem[0].value);
      });
    if (findDuplicates(valueEachRow).length !== 0) {
      cy.log('Value row have Double ' + findDuplicates(valueEachRow));
      cy.get(findDuplicates(valueEachRow)).should('have.value', '0');
    }
  });

  it('check row', () => {
    cy.visit('/');
    let data;
    cy.window().then((elem) => {
      data = elem.game.game.validation;
      const col = data.col;
      const row = data.row;
      const sect = data.sect;
      cy.get('td')
        .children()
        .not('[class="disabled"]')
        .each((elem) => {
          const dataSementara = [];
          const section =
            sect[Math.floor(Number([elem[0].col]) / 3)][
              Math.floor(Number([elem[0].row]) / 3)
            ];
          cy.log(section);
          // potentialNum(row, col, section);
          // sect[Math.floor(Number(col[elem[0].col]) / 3)][
          //   Math.floor(Number(row[elem[0].row]) / 3)
          // ];
          // dataSementara.push(col[elem[0].col]);
          // dataSementara.push(row[elem[0].row]);

          // cy.log(col[elem[0].col], row[elem[0].row]);
          // cy.log(elem[0].col, elem[0].row);
          // cy.get(elem[0]).type(3);
          // cy.log(dataSementara);
          // elem[0].col, elem[0].row;
          cy.log(potentialNum(row, col, section));
        });
      // cy.log(sect[0][0]);
    });
  });
});

function potentialNum(...val) {
  const result = [];
  const data = [];
  [...new Set(val.flat())].sort().forEach((num) => result.push(Number(num)));
  for (let i = 1; i <= 9; i++) {
    !result.includes(i) ? data.push(i) : '';
  }
  return data;
}
