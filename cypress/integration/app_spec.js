describe('app visit', () => {
    it('should contain the title', () => {
        cy.visit('/')
        cy
            .get('h1')
            .contains('bURL')
    })
})
