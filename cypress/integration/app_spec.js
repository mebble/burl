describe('foo', () => {
    it('haha', () => {
        cy.visit('localhost:3000')
        cy
            .get('h1')
            .contains('Welcome to Burl!!')
    })
})
