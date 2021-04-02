import { getQueryParams } from '../../src/url'

describe('getQueryParams', () => {
    it('should return an empty map for an invalid URL', () => {
        const params = getQueryParams('some-invalid-url')
        expect(params).to.deep.equal(new Map())
    })

    it('should return an empty map for a URL without a query string', () => {
        const params = getQueryParams('http://example.com/some/path')
        expect(params).to.deep.equal(new Map())
    })
})
