describe('Search and Add to Cart', () => {

    before(() => {
        cy.intercept('https://rahulshettyacademy.com/seleniumPractise/data/products.json').as('getProduct')
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.wait('@getProduct')
    })

    it('Add Tomato to Cart', () => {
        
        cy.get('.search-keyword').type('Tomato')
        cy.wait(2000)

        cy.get('.product-name').should('contain', 'Tomato')
        cy.get('.product-action > button').click()

        cy.get('.search-keyword').clear()

    })

    it.only('Add Cashew to Cart', () => {
        //Search keyword "ca"
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)

        cy.get('.products').find('.product').each(($el, index, $list) => {
            const veggiesText = $el.find('h4.product-name').text()
            console.log(veggiesText)

            if(veggiesText.includes('Cashew')) {
                cy.wrap($el).find('button').contains('ADD TO CART').click()
            }
        })

    })



})