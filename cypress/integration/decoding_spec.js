import { assertQueryParams } from "../support/helpers"

describe('URL decoding', () => {
    const encodedParam = 'tom%20%2B%20jerry%20%3E%3D%20100%25'
    const decodedParam = 'tom + jerry >= 100%'

    before(() => {
        cy.visit('/')
    })

    beforeEach(() => {
        cy.get('input[aria-label="url"]')
            .clear()
            .type(`http://example.com:80/path?a=cat&b=${encodedParam}#foo`)
    })

    it('decodes a query param field', () => {
        cy.get('input[aria-labelledby="query-b"]')
            .should('have.value', encodedParam)

        cy.get('[role="switch"][aria-label="query-b-decode-url"]')
            .should('have.attr', 'aria-checked', 'false')
            .click()
            .should('have.attr', 'aria-checked', 'true')


        cy.get('.query li')
            .should('have.length', 2)
            .each(assertQueryParams(cy, [
                ['a', 'cat'],
                ['b', decodedParam]
            ]))

        cy.get('[role="switch"][aria-label="query-b-decode-url"]')
            .click()
            .should('have.attr', 'aria-checked', 'false')

        cy.get('.query li')
            .should('have.length', 2)
            .each(assertQueryParams(cy, [
                ['a', 'cat'],
                ['b', encodedParam]
            ]))
    })
})
