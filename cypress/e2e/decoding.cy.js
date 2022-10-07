import { assertQueryParams } from "../support/helpers"

describe('URL decoding', () => {
    const encodedParam = 'tom%20%2B%20jerry%20%3E%3D%20100%25'
    const decodedParam = 'tom + jerry >= 100%'
    const encodedFragment = 'http%3A%2F%2Fexample.com%2Fhey'
    const decodedFragment = 'http://example.com/hey'

    before(() => {
        cy.visit('/')
    })

    beforeEach(() => {
        cy.get('input[aria-label="url"]')
            .clear()
            .type(`http://example.com:80/path?a=cat&b=${encodedParam}#${encodedFragment}`)
    })

    it('decodes a query param field and update the url bar', () => {
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
        cy.get('input[aria-label="url"]')
            .should('have.value', `http://example.com:80/path?a=cat&b=${decodedParam}#${encodedFragment}`)

        cy.get('[role="switch"][aria-label="query-b-decode-url"]')
            .click()
            .should('have.attr', 'aria-checked', 'false')

        cy.get('.query li')
            .should('have.length', 2)
            .each(assertQueryParams(cy, [
                ['a', 'cat'],
                ['b', encodedParam]
            ]))
        cy.get('input[aria-label="url"]')
            .should('have.value', `http://example.com:80/path?a=cat&b=${encodedParam}#${encodedFragment}`)
    })

    it('decodes the fragment field and update the url bar', () => {
        cy.get('input[aria-labelledby="fragment"]')
            .should('have.value', encodedFragment)

        cy.get('[role="switch"][aria-label="fragment-decode-url"]')
            .should('have.attr', 'aria-checked', 'false')
            .click()
            .should('have.attr', 'aria-checked', 'true')

        cy.get('input[aria-labelledby="fragment"]')
            .should('have.value', decodedFragment)
        cy.get('input[aria-label="url"]')
            .should('have.value', `http://example.com:80/path?a=cat&b=${encodedParam}#${decodedFragment}`)

        cy.get('[role="switch"][aria-label="fragment-decode-url"]')
            .click()
            .should('have.attr', 'aria-checked', 'false')

        cy.get('input[aria-labelledby="fragment"]')
            .should('have.value', encodedFragment)
        cy.get('input[aria-label="url"]')
            .should('have.value', `http://example.com:80/path?a=cat&b=${encodedParam}#${encodedFragment}`)
    })
})
