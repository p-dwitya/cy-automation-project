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

Cypress.Commands.add('searchInput', (veggies) => { 

    cy.get('.search-keyword').type(veggies)
    cy.wait(2000)

})

Cypress.Commands.add('assertPrice', (veggies, productList) => {
    for(let i=0; i<productList.length; i++){
        if(productList[i].name.includes(veggies)) {
            cy.get('.product-price').should('contain', productList[i].price)
            cy.get('.product-name').should('contain', veggies)
        }
    }
})

Cypress.Commands.add('assetCartPrice', (veggies, productList, el) => {
    let itemPrices = []
    let totalPrice = 0
    for(let i=0; i<productList.length; i++){
        if(productList[i].name.includes(veggies[0])|productList[i].name.includes(veggies[1])) {
            itemPrices.push(productList[i].price)
            cy.log(itemPrices)
        }
    }
    for (let j=0; j<itemPrices.length; j++){
        totalPrice = totalPrice+itemPrices[j]
        cy.log(totalPrice)
    }

    cy.log(el)

    cy.wrap(el).should('have.text', totalPrice)

})