describe('Search and Add to Cart', () => {

    let productList

    before(() => {
        
        cy.intercept('https://rahulshettyacademy.com/seleniumPractise/data/products.json').as('getProduct')

        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.wait('@getProduct')

        cy.request('https://rahulshettyacademy.com/seleniumPractise/data/products.json').then((response) => {
            productList = response.body
            cy.log(productList)
        })
        
      
    })

    it('Add Tomato to Cart', () => {

        cy.searchInput('Tomato')
        cy.get('.product-action > button').click()
        cy.get('.product-name').then(() => {
            cy.assertPrice('Tomato', productList)
        })
        
        cy.get('.search-keyword').clear()

    })

    it('Add Cashew to Cart', () => {
        
        cy.searchInput('ca')
        cy.get('.products').find('.product').each(($el, index, $list) => {

            const veggiesText = $el.find('h4.product-name').text()
            
            if(veggiesText.includes('Cashew')) {
                cy.wrap($el).find('.product-price').then(() => {
                    cy.assertPrice('Cashew', productList)
                })
                cy.wrap($el).find('button').contains('ADD TO CART').click()
            }
        })

    })

    it('Check the quantity and price of Cart Notification', () => {
        let veggies= ['Tomato', 'Cashew']

        cy.get('tbody > :nth-child(2) > :nth-child(3)').then(($el) => {
            cy.assetCartPrice(veggies, productList, $el)
        })
        cy.get('tbody > :nth-child(1) > :nth-child(3)').should('have.text', veggies.length)
        

    })

    it('Proceed to Checkout Page', () => {
        cy.get('.cart-icon > img').click()
        cy.get('button').contains('PROCEED TO CHECKOUT').click()
        cy.wait(2000)
    })


    it('Proceed to Place Order', () => {
        cy.get('button').contains('Place Order').click()
    })





})