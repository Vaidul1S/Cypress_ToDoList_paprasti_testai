/// <reference types="cypress" />

// Susikurti naują GitHub projektą
// Jame susidiegti Cypress
// Parašyti testus paskaitoje naudojamai svetainei https://todolist.james.am/#/ :
//     3.1. Ar <header> elementas atvaizduojamas.
//     3.2. Ar headeryje atvaizduojamas tekstas "To Do List"
//     3.3. Ar atvaizduojamas 'Double-click to edit a todo' tekstas
//     3.4 Ar input laukelyje atvaizduojamas tekstas 'What need's to be done?'
//     3.5. Ar pridėjus kelias užduotis, užduočių sąrašas nėra tuščias

describe('ToDo Simple Test', () => {

    it('visit ToDo site', () => {
        cy.visit('https://todolist.james.am/#/');
        cy.get('header').should('be.visible');
        cy.get('h1').should('be.visible');
        cy.get('footer p').should('be.visible').and('have.text', 'Double-click to edit a toodo'); // tinklapyje gramatine klaida frazėje "... toodo" vietoj "todo"!
        cy.get('input.new-todo').should('be.visible').and('have.attr', 'placeholder', `What need's to be done?`);

        ['first entry', 'second entry', 'fourth entry'].forEach(e => {cy.get('input.new-todo').type(`${e}{enter}`)});
        cy.get('ul.todo-list li').should('have.length', 3);

    });

});