import { queryAddNames } from "../support/helpers"

describe('adding new query param', () => {
    before(() => {
        cy.visit('/')
    })
    beforeEach(() => {
        cy.get('input[name="url"]')
            .clear()
            .type('http://e.com?a=cat&b=dog')
    })
    it('should update the field inputs when typing into the add query input form', () => {
        cy.get(`input[name="${queryAddNames.key}"]`)
            .type('c')
            .should('have.value', 'c')
        cy.get(`input[name="${queryAddNames.value}"]`)
            .type('dinosaur')
            .should('have.value', 'dinosaur')
    })
    it('should add a query param with a new key and then clear the form inputs')
    it('should not add a query param with an existing key and not clear the form inputs')
    it('should add a query param with an empty key and then clear the form inputs')
})

describe('removing query params', () => {

})
