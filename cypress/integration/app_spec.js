describe('app visit', () => {
    it('should contain the title', () => {
        cy.visit('/')
        cy.get('h1')
            .contains('bURL')
    })

    context('without query string', () => {
        it('should contain empty URL fields', () => {
            cy.visit('/')

            cy.get('.url')
                .should('have.value', '')

            const fields = [
                '.protocol',
                '.host',
                '.port',
                '.path',
                '.fragment',
            ]

            fields.forEach(field => {
                cy.get(field)
                    .should('have.value', '')
                    .and('be.disabled')
            })

            cy.get('.query')
                .should('not.have.descendants', 'li')
        })
    })

    context('with invalid URL in query string', () => {
        it('should contain the given URL and an error message', () => {
            const url = 'some-invalid-url'
            const message = 'This URL is not valid!'

            cy.visit(`/?u=${url}`)
            cy.get('.url')
                .should('have.value', url)
            cy.get('.prompt')
                .contains(message)
        })
    })
})
