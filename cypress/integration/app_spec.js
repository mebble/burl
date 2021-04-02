describe('app visit', () => {
    const fields = [
        '.protocol',
        '.hostname',
        '.port',
        '.path',
        '.fragment',
    ]

    context('without query string', () => {
        it('should contain the correct prompt and empty URL fields', () => {
            const prompt = 'Enter a URL above'

            cy.visit('/')

            cy.get('.url')
                .should('have.value', '')
            cy.get('.prompt')
                .contains(prompt)
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
        it('should contain the given URL, the correct prompt and empty URL fields', () => {
            const url = 'some-invalid-url'
            const prompt = 'This URL is not valid!'

            cy.visit(`/?u=${url}`)

            cy.get('.url')
                .should('have.value', url)
            cy.get('.prompt')
                .contains(prompt)
            fields.forEach(field => {
                cy.get(field)
                    .should('have.value', '')
                    .and('be.disabled')
            })
            cy.get('.query')
                .should('not.have.descendants', 'li')
        })
    })

    context('with valid URL in query string', () => {
        it('should contain the given URL and the correct prompt', () => {
            const url = 'http://example.com:8080/'
            const prompt = 'Your URL is broken down below'

            cy.visit(`/?u=${url}`)

            cy.get('.url')
                .should('have.value', url)
            cy.get('.prompt')
                .contains(prompt)
        })
    })
})
