import { prompt } from '../../src/constants'

const fields = [
    '.protocol',
    '.hostname',
    '.port',
    '.path',
    '.fragment',
]

describe('typing into URL input', () => {
    before(() => {
        cy.visit('/')
    })
    beforeEach(() => {
        cy.get('.url').clear()
    })

    it('should show invalid prompt and empty disabled URL fields when invalid URL is typed', () => {
        cy.get('.url')
            .type('Hey hello')

        cy.get('.prompt')
            .contains(prompt.invalid)
        fields.forEach(field => {
            cy.get(field)
                .should('have.value', '')
                .and('be.disabled')
        })
    })

    it('should show good prompt and filled editable URL fields when valid URL is typed', () => {
        const expectedQueryParams = [
            ['a', 'cat'],
            ['b', 'dog'],
        ];

        cy.get('.url')
            .type('http://example.com:80/path?a=cat&b=dog#foo')

        cy.get('.prompt')
            .contains(prompt.done)
        fields.forEach(field => {
            cy.get(field)
                .and('not.be.disabled')
        })

        cy.get('.protocol')
            .should('have.value', 'http')
        cy.get('.hostname')
            .should('have.value', 'example.com')
        cy.get('.port')
            .should('have.value', '80')
        cy.get('.path')
            .should('have.value', '/path')
        cy.get('.query > li')
            .each(($item, i) => {
                const [ key, val ] = expectedQueryParams[i]
                cy.wrap($item).contains(key)
                cy.wrap($item).contains(val)
            })
        cy.get('.fragment')
            .should('have.value', 'foo')
    })
})
