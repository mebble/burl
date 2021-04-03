describe('app visit', () => {
    const fields = [
        '.protocol',
        '.hostname',
        '.port',
        '.path',
        '.fragment',
    ]

    context('without query string', () => {
        it('should contain the correct prompt and empty and disabled URL fields', () => {
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
        it('should contain the given URL, the correct prompt and empty and disabled URL fields', () => {
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
        it.skip('should contain the given URL, the correct prompt and filled editable URL fields', () => {
            const url = 'http://example.com:8080/path?a=cat&b=dog#foo'
            const expectedQueryParams = [
                ['a', 'cat'],
                ['b', 'dog'],
            ];
            const prompt = 'Your URL is broken down below'

            cy.visit(`/?u=${url}`)

            cy.get('.url')
                .should('have.value', url)
            cy.get('.prompt')
                .contains(prompt)
            fields.forEach(field => {
                cy.get(field)
                    .and('not.be.disabled')
            })

            cy.get('.protocol')
                .should('have.value', 'http')
            cy.get('.hostname')
                .should('have.value', 'example.com')
            cy.get('.port')
                .should('have.value', '8080')
            cy.get('.path')
                .should('have.value', '/path')
            cy.get('.query > li')
                .each(($item, i) => {
                    const [ key, val ] = expectedQueryParams[i]
                    cy.wrap($item).contains(key)
                    cy.wrap($item).contains(val)
                })
            cy.get('.fragment')
                .should('have.value', 'foo')
        })
    })
})
