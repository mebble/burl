import { prompt } from '../../src/constants'
import { assertQueryParams, fieldNames } from '../support/helpers'

describe('app visit', () => {
    context('without query string', () => {
        it('should contain the correct prompt and empty and disabled URL fields', () => {
            cy.visit('/')

            cy.get('input[name="url"]')
                .should('have.value', '')
            cy.get('.prompt')
                .contains(prompt.intro)
            fieldNames.forEach(name => {
                cy.get(`input[name="${name}"]`)
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

            cy.visit(`/?u=${url}`)

            cy.get('input[name="url"]')
                .should('have.value', url)
            cy.get('.prompt')
                .contains(prompt.invalid)
            fieldNames.forEach(name => {
                cy.get(`input[name="${name}"]`)
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

            cy.visit(`/?u=${url}`)

            cy.get('input[name="url"]')
                .should('have.value', url)
            cy.get('.prompt')
                .contains(prompt.done)
            fieldNames.forEach(name => {
                cy.get(`input[name="${name}"]`)
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
                .each(assertQueryParams(cy, expectedQueryParams))
            cy.get('.fragment')
                .should('have.value', 'foo')
        })
    })
})
