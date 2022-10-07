import { fieldNames, zip } from "../support/helpers"

describe('Copying fields to the clipboard', () => {
    before(() => {
        cy.visit('/')
    })

    beforeEach(() => {
        cy.get('input[aria-label="url"]')
            .clear()
            .type(`http://example.com:80/path?a=cat&b=dog#foo`)
    })

    it('copies the URL bar input')

    it('copies the URL fields', () => {
        const fieldValues = [
            'http',
            'example.com',
            '80',
            '/path',
            'foo'
        ];

        cy.window().then(win => {
            zip(fieldNames, fieldValues).forEach(([name, value]) => {
                cy.get(`button[aria-label="Copy ${name}"]`)
                    .click()
                    .then(() => {
                        win.navigator.clipboard.readText().then(text => {
                            expect(text).to.eq(value)
                        })
                    })
            })
        })
    })

    it('copies the query param fields', () => {
        cy.window().then(win => {
            zip(['a', 'b'], ['cat', 'dog']).forEach(([name, value]) => {
                cy.get(`button[aria-label="Copy query ${name}"]`)
                    .click()
                    .then(() => {
                        win.navigator.clipboard.readText().then(text => {
                            expect(text).to.eq(value)
                        })
                    })
            })
        })
    })
})
