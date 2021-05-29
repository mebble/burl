export const assertQueryParams = (cy, expectedPairs) => ($item, i) => {
    const [ key, val ] = expectedPairs[i]
    cy.wrap($item).contains(key)
    cy.wrap($item).find(`input[aria-labelledby="query-${key}"]`)
        .should('have.value', val)
};

export const fieldNames = [
    'protocol',
    'hostname',
    'port',
    'path',
    'fragment',
]

export const queryAddNames = {
    key: 'New query key',
    value: 'New query value'
};
