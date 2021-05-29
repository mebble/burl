import { prompt } from '../../src/constants'
import { assertQueryParams, fieldNames, queryAddNames } from '../support/helpers'

describe('typing into URL input', () => {
    before(() => {
        cy.visit('/')
    })
    beforeEach(() => {
        cy.get('input[aria-label="url"]').clear()
    })

    it('should show invalid prompt, empty disabled URL fields and query form when invalid URL is typed', () => {
        cy.get('input[aria-label="url"]')
            .type('Hey hello')

        cy.get('.prompt')
            .contains(prompt.invalid)
        fieldNames.forEach(name => {
            cy.get(`input[aria-labelledby="${name}"]`)
                .should('have.value', '')
                .and('be.disabled')
        })
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

    it('should show good prompt and filled editable URL fields and query form when valid URL is typed', () => {
        const expectedQueryParams = [
            ['a', 'cat'],
            ['b', 'dog'],
        ];

        cy.get('input[aria-label="url"]')
            .type('http://example.com:80/path?a=cat&b=dog#foo')

        cy.get('.prompt')
            .contains(prompt.done)
        fieldNames.forEach(name => {
            cy.get(`input[aria-labelledby="${name}"]`)
                .and('not.be.disabled')
        })

        cy.get('input[aria-labelledby="protocol"]')
            .should('have.value', 'http')
        cy.get('input[aria-labelledby="hostname"]')
            .should('have.value', 'example.com')
        cy.get('input[aria-labelledby="port"]')
            .should('have.value', 80)
        cy.get('input[aria-labelledby="path"]')
            .should('have.value', '/path')
        cy.get('.query li')
            .should('have.length', expectedQueryParams.length)
            .each(assertQueryParams(cy, expectedQueryParams))
        cy.get('input[aria-labelledby="fragment"]')
            .should('have.value', 'foo')

        cy.get('form.query-form').within(() => {
            cy.get(`input[name="${queryAddNames.key}"]`)
                .should('have.value', '')
                .and('not.be.disabled')
            cy.get(`input[name="${queryAddNames.value}"]`)
                .should('have.value', '')
                .and('not.be.disabled')
            cy.get('button')
                .should('have.text', 'Add')
                .and('not.be.disabled')
        })
    })

    it('should display only the last of the duplicate keys of the URL query params', () => {
        const expectedQueryParams = [
            ['a', 'camel'],
            ['b', 'dog'],
        ];

        cy.get('input[aria-label="url"]')
            .type('http://example.com/some/path?a=cat&b=dog&a=camel')

        cy.get('.query li')
            .should('have.length', expectedQueryParams.length)
            .each(assertQueryParams(cy, expectedQueryParams))
    })
})

describe('editing one of the URL fields', () => {
    before(() => {
        cy.visit('/')
    })
    beforeEach(() => {
        cy.get('input[aria-label="url"]')
            .clear()
            .type('http://example.com:80/path?a=cat&b=dog#foo')
    })

    it('should update the protocol field and url input when the protocol is edited', () => {
        cy.get('input[aria-labelledby="protocol"]')
            .type('s')
            .should('have.value', 'https')

        cy.get('input[aria-label="url"]')
            .should('have.value', 'https://example.com:80/path?a=cat&b=dog#foo')
    })

    it('should update the hostname field and url input when the hostname is edited', () => {
        cy.get('input[aria-labelledby="hostname"]')
            .type('com')
            .should('have.value', 'example.comcom')

        cy.get('input[aria-label="url"]')
            .should('have.value', 'http://example.comcom:80/path?a=cat&b=dog#foo')
    })

    it('should update the port field and url input when the port is edited with numeric characters', () => {
        cy.get('input[aria-labelledby="port"]')
            .type('08')
            .should('have.value', 8008)

        cy.get('input[aria-label="url"]')
            .should('have.value', 'http://example.com:8008/path?a=cat&b=dog#foo')
    })

    it('should NOT update the port field and url input when the port is edited with non-numeric characters', () => {
        cy.get('input[aria-labelledby="port"]')
            .type('23abc')
            .should('have.value', 8023)

        cy.get('input[aria-label="url"]')
            .should('have.value', 'http://example.com:8023/path?a=cat&b=dog#foo')
    })

    it('should remove the port from the port field and url input when the port is cleared by the user', () => {
        cy.get('input[aria-labelledby="port"]')
            .type('{backspace}{backspace}')
            .should('have.value', '')

        cy.get('input[aria-label="url"]')
            .should('have.value', 'http://example.com/path?a=cat&b=dog#foo')
    })

    it('should update the path field and url input when the path is edited', () => {
        cy.get('input[aria-labelledby="path"]')
            .type('/subpath')
            .should('have.value', '/path/subpath')

        cy.get('input[aria-label="url"]')
            .should('have.value', 'http://example.com:80/path/subpath?a=cat&b=dog#foo')
    })

    it('should update the value of the query param field and url input when a query param value is edited', () => {
        cy.get('input[name="a"]')
            .type('nap')
            .should('have.value', 'catnap')

        cy.get('input[aria-label="url"]')
            .should('have.value', 'http://example.com:80/path?a=catnap&b=dog#foo')
    })

    it('should update the fragment field and url input when the fragment is edited', () => {
        cy.get('input[aria-labelledby="fragment"]')
            .type('bar')
            .should('have.value', 'foobar')

        cy.get('input[aria-label="url"]')
            .should('have.value', 'http://example.com:80/path?a=cat&b=dog#foobar')
    })
})
