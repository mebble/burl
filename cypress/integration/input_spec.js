import { prompt } from '../../src/constants'
import { assertQueryParams, fieldNames } from '../support/helpers'

describe('typing into URL input', () => {
    before(() => {
        cy.visit('/')
    })
    beforeEach(() => {
        cy.get('input[name="url"]').clear()
    })

    it('should show invalid prompt and empty disabled URL fields when invalid URL is typed', () => {
        cy.get('input[name="url"]')
            .type('Hey hello')

        cy.get('.prompt')
            .contains(prompt.invalid)
        fieldNames.forEach(name => {
            cy.get(`input[name="${name}"]`)
                .should('have.value', '')
                .and('be.disabled')
        })
    })

    it('should show good prompt and filled editable URL fields when valid URL is typed', () => {
        const expectedQueryParams = [
            ['a', 'cat'],
            ['b', 'dog'],
        ];

        cy.get('input[name="url"]')
            .type('http://example.com:80/path?a=cat&b=dog#foo')

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
            .should('have.value', '80')
        cy.get('input[name="path"]')
            .should('have.value', '/path')
        cy.get('.query > li')
            .each(assertQueryParams(cy, expectedQueryParams))
        cy.get('input[name="fragment"]')
            .should('have.value', 'foo')
    })

    it('should display only the last of the duplicate keys of the URL query params', () => {
        const expectedQueryParams = [
            ['a', 'camel'],
            ['b', 'dog'],
        ];

        cy.get('input[name="url"]')
            .type('http://example.com/some/path?a=cat&b=dog&a=camel')

        cy.get('.query > li')
            .each(assertQueryParams(cy, expectedQueryParams))
    })

})