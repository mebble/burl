import { prompt } from '../../src/constants'
import { assertQueryParams, fieldNames, queryAddNames } from '../support/helpers'

describe('app visit', () => {
    context('without query string', () => {
        it('should contain the correct prompt and empty and disabled URL fields and query form', () => {
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

            cy.get('form.query-form').within(() => {
                cy.get(`input[name="${queryAddNames.key}"]`)
                    .should('have.value', '')
                    .and('be.disabled')
                cy.get(`input[name="${queryAddNames.value}"]`)
                    .should('have.value', '')
                    .and('be.disabled')
                cy.get('button')
                    .should('have.text', 'Add')
                    .and('be.disabled')
            })
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

            cy.get('input[name="protocol"]')
                .should('have.value', 'http')
            cy.get('input[name="hostname"]')
                .should('have.value', 'example.com')
            cy.get('input[name="port"]')
                .should('have.value', '8080')
            cy.get('input[name="path"]')
                .should('have.value', '/path')
            cy.get('.query > li')
                .each(assertQueryParams(cy, expectedQueryParams))
            cy.get('input[name="fragment"]')
                .should('have.value', 'foo')
        })
    })
})

describe('visit the given url', () => {
    const url = 'http://example.com:80/path?a=cat&b=dog#foo';

    before(() => {
        cy.visit('/')
    })
    beforeEach(() => {
        cy.get('input[name="url"]')
            .clear()
            .type(url)
    })

    it('should create an anchor tag that opens the given url in a new tab and avoids tabnabbing', () => {
        cy.get('a.url')
            .should('have.attr', 'href', url)
            .should('have.attr', 'target', "_blank")
            .should('have.attr', 'rel', 'noopener noreferrer')
    })
})
