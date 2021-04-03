export const assertQueryParams = (cy, expectedPairs) => ($item, i) => {
    const [ key, val ] = expectedPairs[i]
    cy.wrap($item).contains(key)
    cy.wrap($item).find(`input[name="${key}"]`)
        .should('have.value', val)
};
