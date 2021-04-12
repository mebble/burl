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

describe('editing one of the URL fields', () => {
    before(() => {
        cy.visit('/')
    })
    beforeEach(() => {
        cy.get('input[name="url"]')
            .clear()
            .type('http://example.com:80/path?a=cat&b=dog#foo')
    })

    it('should update the protocol field and url input when the protocol is edited', () => {
        cy.get('input[name="protocol"]')
            .type('s')
            .should('have.value', 'https')

        cy.get('input[name="url"]')
            .should('have.value', 'https://example.com:80/path?a=cat&b=dog#foo')
    })

    it('should update the hostname field and url input when the hostname is edited', () => {
        cy.get('input[name="hostname"]')
            .type('com')
            .should('have.value', 'example.comcom')

        cy.get('input[name="url"]')
            .should('have.value', 'http://example.comcom:80/path?a=cat&b=dog#foo')
    })

    it('should update the port field and url input when the port is edited', () => {
        cy.get('input[name="port"]')
            .type('08')
            .should('have.value', '8008')

        cy.get('input[name="url"]')
            .should('have.value', 'http://example.com:8008/path?a=cat&b=dog#foo')
    })

    it('should update the path field and url input when the path is edited', () => {
        cy.get('input[name="path"]')
            .type('/subpath')
            .should('have.value', '/path/subpath')

        cy.get('input[name="url"]')
            .should('have.value', 'http://example.com:80/path/subpath?a=cat&b=dog#foo')
    })
})
