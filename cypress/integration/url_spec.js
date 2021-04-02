import { getQueryParams, isHttpUrl, parseUrl } from '../../src/url'

describe('getQueryParams', () => {
    it('should return an empty map for an invalid URL', () => {
        const params = getQueryParams('some-invalid-url')
        expect(params).to.deep.equal(new Map())
    })

    it('should return an empty map for a query string not beginning with a query string separator', () => {
        const params = getQueryParams('a=cat&b=dog')
        expect(params).to.deep.equal(new Map())
    })

    it('should return an empty map for a URL without a query string', () => {
        const params = getQueryParams('http://example.com/some/path')
        expect(params).to.deep.equal(new Map())
    })

    it('should return an empty map for a URL with a trailing query string separator', () => {
        const params = getQueryParams('http://example.com/some/path?')
        expect(params).to.deep.equal(new Map())
    })

    it('should return a map of the query params from the URL', () => {
        const params = getQueryParams('http://example.com/some/path?a=cat&b=dog')
        const expected = new Map([
            ['a', 'cat'],
            ['b', 'dog']
        ])
        expect(params).to.deep.equal(expected)
    })

    it('should return a map of the query params of a URL having a query string separator within the query string', () => {
        const params = getQueryParams('http://example.com/some/path?a=cat?&b=dog')
        const expected = new Map([
            ['a', 'cat?'],
            ['b', 'dog']
        ])
        expect(params).to.deep.equal(expected)
    })

    it('should return a map of the query params of a query string beginning with a query string separator', () => {
        const params = getQueryParams('?a=cat&b=dog')
        const expected = new Map([
            ['a', 'cat'],
            ['b', 'dog']
        ])
        expect(params).to.deep.equal(expected)
    })
})

describe('isHttpUrl', () => {
    it('is false for string without protocol', () => {
        expect(isHttpUrl('example.com')).to.be.false
    })

    it('is false for javascript url', () => {
        expect(isHttpUrl('javascript:void(0)')).to.be.false
    })

    it('is false for string with some other protocol', () => {
        expect(isHttpUrl('ftp://example.com')).to.be.false
    })

    it('is true for string with http protocol', () => {
        expect(isHttpUrl('http://example.com')).to.be.true
    })

    it('is true for string with https protocol', () => {
        expect(isHttpUrl('https://example.com')).to.be.true
    })
})

describe('parseUrl', () => {
    it('should throw an error when url is not an http url', () => {
        const url = 'ftp://example.com'
        expect(() => {
            const _ = parseUrl(url)
        }).to.throw('Must be an HTTP URL')
    });

    it('should throw an error when url is an invalid url', () => {
        const url = 'some-invalid-url'
        expect(() => {
            const _ = parseUrl(url)
        }).to.throw('Must be an HTTP URL')
    });

    it('should parse an http url having all fields');
    it('should ignore the trailing query string separator of a url');
    it('should create a root path for a url having no path');
})
