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

    context('with a new key', () => {
        const expectedQueryParams = [
            ['a', 'cat'],
            ['b', 'dog'],
            ['c', 'dinosaur'],
        ]
        const assertQueryParamsAddedAndQueryFormCleared = () => {
            cy.get('.query > li')
                .should('have.length', expectedQueryParams.length)
                .each(assertQueryParams(cy, expectedQueryParams))

            cy.get('form.query-form').within(() => {
                cy.get(`input[name="${queryAddNames.key}"]`)
                    .should('have.value', '')
                cy.get(`input[name="${queryAddNames.value}"]`)
                    .should('have.value', '')
            })
        }

        it('should add a query param on value enter and then clear the form inputs', () => {
            cy.get('form.query-form').within(() => {
                cy.get(`input[name="${queryAddNames.key}"]`)
                    .type('c')
                cy.get(`input[name="${queryAddNames.value}"]`)
                    .type('dinosaur{enter}')
            })

            assertQueryParamsAddedAndQueryFormCleared()
        })

        it('should add a query param on key enter and then clear the form inputs', () => {
            cy.get('form.query-form').within(() => {
                cy.get(`input[name="${queryAddNames.value}"]`)
                    .type('dinosaur')
                cy.get(`input[name="${queryAddNames.key}"]`)
                    .type('c{enter}')
            })

            assertQueryParamsAddedAndQueryFormCleared()
        })

        it('should add a query param on button click and then clear the form inputs', () => {
            cy.get('form.query-form').within(() => {
                cy.get(`input[name="${queryAddNames.key}"]`)
                    .type('c')
                cy.get(`input[name="${queryAddNames.value}"]`)
                    .type('dinosaur')
                cy.get('button')
                    .click()
            })

            assertQueryParamsAddedAndQueryFormCleared()
        })
    })

    context('with an existing key', () => {
        it('should not add a query param and not clear the form inputs')
    })

    context('with an empty key', () => {
        it('should add a query param and then clear the form inputs')
    })
})

describe('removing query params', () => {

})
