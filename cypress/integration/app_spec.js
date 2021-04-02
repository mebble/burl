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
            cy
                .get('.url')
                .should('have.value', '')
        })
    })
})
