import { queryAddNames, assertQueryParams } from "../support/helpers"

describe('adding new query param', () => {
    before(() => {
        cy.visit('/')
    })
    beforeEach(() => {
        cy.get('input[name="url"]')
            .clear()
            .type('http://e.com?a=cat&b=dog')
        cy.get('form.query-form').within(() => {
            cy.get(`input[name="${queryAddNames.key}"]`)
                .clear()
            cy.get(`input[name="${queryAddNames.value}"]`)
                .clear()
        })
    })

    it('should update the field inputs when typing into the add query input form', () => {
        cy.get(`input[name="${queryAddNames.key}"]`)
            .type('c')
            .should('have.value', 'c')
        cy.get(`input[name="${queryAddNames.value}"]`)
            .type('dinosaur')
            .should('have.value', 'dinosaur')
    })

    it('should add a query param with a new key on value enter and then clear the form inputs', () => {
        cy.get('form.query-form').within(() => {
            cy.get(`input[name="${queryAddNames.key}"]`)
                .type('c')
            cy.get(`input[name="${queryAddNames.value}"]`)
                .type('dinosaur{enter}')
        })

        const expectedQueryParams = [
            ['a', 'cat'],
            ['b', 'dog'],
            ['c', 'dinosaur'],
        ]

        cy.get('.query > li')
            .should('have.length', expectedQueryParams.length)
            .each(assertQueryParams(cy, expectedQueryParams))

        cy.get('form.query-form').within(() => {
            cy.get(`input[name="${queryAddNames.key}"]`)
                .should('have.value', '')
            cy.get(`input[name="${queryAddNames.value}"]`)
                .should('have.value', '')
        })
    })

    it('should add a query param with a new key on key enter and then clear the form inputs', () => {
        cy.get('form.query-form').within(() => {
            cy.get(`input[name="${queryAddNames.value}"]`)
                .type('dinosaur')
            cy.get(`input[name="${queryAddNames.key}"]`)
                .type('c{enter}')
        })

        const expectedQueryParams = [
            ['a', 'cat'],
            ['b', 'dog'],
            ['c', 'dinosaur'],
        ]

        cy.get('.query > li')
            .should('have.length', expectedQueryParams.length)
            .each(assertQueryParams(cy, expectedQueryParams))

        cy.get('form.query-form').within(() => {
            cy.get(`input[name="${queryAddNames.key}"]`)
                .should('have.value', '')
            cy.get(`input[name="${queryAddNames.value}"]`)
                .should('have.value', '')
        })
    })

    it('should add a query param with a new key on button click and then clear the form inputs', () => {
        cy.get('form.query-form').within(() => {
            cy.get(`input[name="${queryAddNames.key}"]`)
                .type('c')
            cy.get(`input[name="${queryAddNames.value}"]`)
                .type('dinosaur')
            cy.get('button')
                .click()
        })

        const expectedQueryParams = [
            ['a', 'cat'],
            ['b', 'dog'],
            ['c', 'dinosaur'],
        ]

        cy.get('.query > li')
            .should('have.length', expectedQueryParams.length)
            .each(assertQueryParams(cy, expectedQueryParams))

        cy.get('form.query-form').within(() => {
            cy.get(`input[name="${queryAddNames.key}"]`)
                .should('have.value', '')
            cy.get(`input[name="${queryAddNames.value}"]`)
                .should('have.value', '')
        })
    })

    it('should not add a query param with an existing key and not clear the form inputs')

    it('should add a query param with an empty key and then clear the form inputs')
})

describe('removing query params', () => {

})
