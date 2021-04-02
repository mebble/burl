describe('app visit', () => {
    it('should display the initial content', () => {
        cy.visit('/')
        cy
            .get('h1')
            .contains('Welcome to Burl!!')
    })
})
