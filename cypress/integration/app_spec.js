describe('app visit', () => {
    it('should contain the title', () => {
        cy.visit('/')
        cy
            .get('h1')
            .contains('bURL')
    })

    context('without query string', () => {
        it('should contain empty URL fields', () => {
            cy.visit('/')

            cy.get('.url')
                .should('have.value', '')
            cy.get('.protocol')
                .should('have.value', '')
            cy.get('.host')
                .should('have.value', '')
            cy.get('.port')
                .should('have.value', '')
            cy.get('.path')
                .should('have.value', '')
            cy.get('.fragment')
                .should('have.value', '')

            cy.get('.query')
                .should('not.have.descendants', 'li')
        })
    })
})
